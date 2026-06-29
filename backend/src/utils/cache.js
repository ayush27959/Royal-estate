// Simple in-memory cache for frequently accessed data
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }

  set(key, value, ttl = 3600) {
    // Clear existing timer if any
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Set cache
    this.cache.set(key, value);

    // Set expiration timer
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttl * 1000);

    this.timers.set(key, timer);
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    this.cache.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }

  clear() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.cache.clear();
    this.timers.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const cacheManager = new CacheManager();

// Cache middleware for GET requests
export const cacheMiddleware = (duration = 3600) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    // Don't cache if no-cache header
    if (req.get("Cache-Control") === "no-cache") {
      return next();
    }

    const cacheKey = `${req.originalUrl}`;
    const cachedData = cacheManager.get(cacheKey);

    if (cachedData) {
      res.set("X-Cache", "HIT");
      return res.json(cachedData);
    }

    // Intercept res.json
    const originalJson = res.json;
    res.json = function (data) {
      // Cache the response
      if (res.statusCode === 200) {
        cacheManager.set(cacheKey, data, duration);
        res.set("X-Cache", "MISS");
      }
      return originalJson.call(this, data);
    };

    next();
  };
};

// Cache invalidation helpers
export const invalidateCache = (pattern) => {
  const keys = cacheManager.getStats().keys;
  keys.forEach((key) => {
    if (key.includes(pattern)) {
      cacheManager.delete(key);
    }
  });
};

// Decorator for caching function results
export const cacheable = (duration = 3600) => {
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;
      const cached = cacheManager.get(cacheKey);

      if (cached) {
        return cached;
      }

      const result = await originalMethod.apply(this, args);
      cacheManager.set(cacheKey, result, duration);
      return result;
    };

    return descriptor;
  };
};

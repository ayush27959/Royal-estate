// Frontend performance utilities

// Debounce hook for API calls (e.g., search)
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Throttle function for expensive operations
export const throttle = (func, limit = 300) => {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce function
export const debounce = (func, delay = 500) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Lazy load images using Intersection Observer
export const useLazyImage = (ref, options = {}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "50px",
        ...options,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
};

// Memory-efficient component memoization
export const useMemo = React.useMemo;
export const useCallback = React.useCallback;

// Prefetch data before route change
export const prefetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Prefetch failed");
    return response.json();
  } catch (error) {
    console.error("Prefetch error:", error);
    return null;
  }
};

// Batch DOM updates
export const batchUpdate = (callback) => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
};

// Virtual scrolling helper for long lists
export const useVirtualScroll = (items, visibleCount = 10) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const startIndex = Math.floor(scrollTop / 50); // Assuming ~50px per item
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);

  return {
    visibleItems: items.slice(startIndex, endIndex),
    startIndex,
    offsetY: startIndex * 50,
  };
};

// Request animation frame for smooth animations
export const useRAF = (callback, dependencies = []) => {
  const animationFrameId = React.useRef(null);

  React.useEffect(() => {
    const animate = () => {
      callback();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, dependencies);
};

// Web Worker for heavy computations
export const useWorker = (workerPath) => {
  const [worker, setWorker] = React.useState(null);

  React.useEffect(() => {
    const newWorker = new Worker(workerPath);
    setWorker(newWorker);

    return () => newWorker.terminate();
  }, [workerPath]);

  return {
    postMessage: (data) => worker?.postMessage(data),
    onMessage: (callback) => {
      if (worker) {
        worker.onmessage = (e) => callback(e.data);
      }
    },
  };
};

// Local storage caching for API responses
export const getCachedData = (key, maxAge = 3600000) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > maxAge) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};

export const setCachedData = (key, data) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );
};

export const clearCache = (pattern) => {
  Object.keys(localStorage).forEach((key) => {
    if (key.includes(pattern)) {
      localStorage.removeItem(key);
    }
  });
};

// Performance monitoring
export const measurePerformance = (label) => {
  return {
    start: () => {
      performance.mark(`${label}-start`);
    },
    end: () => {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      const measure = performance.getEntriesByName(label)[0];
      console.log(`⏱️  ${label}: ${measure.duration.toFixed(2)}ms`);
    },
  };
};

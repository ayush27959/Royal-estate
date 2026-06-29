import compression from "compression";
import crypto from "crypto";

// Configure compression middleware for better performance
export const compressionMiddleware = compression({
  // Only compress responses larger than 1kb
  threshold: 1024,

  // Compression level (0-9, 9 is best compression but slower)
  level: 6,

  // Only compress these types
  filter: (req, res) => {
    // Don't compress if no-compression header
    if (req.headers["x-no-compression"]) {
      return false;
    }

    // Use default compression filter
    return compression.filter(req, res);
  },
});

// Cache control middleware
export const setCacheHeaders = (duration = 3600) => {
  return (req, res, next) => {
    // Cache static assets for longer
    if (
      req.path.match(
        /\.(jpg|jpeg|png|gif|svg|css|js|ico|woff|woff2)$/
      )
    ) {
      res.set(
        "Cache-Control",
        `public, max-age=${30 * 24 * 3600}`
      ); // 30 days
      return next();
    }

    // Cache API responses based on duration
    res.set(
      "Cache-Control",
      `public, max-age=${duration}`
    );

    next();
  };
};

// ETag middleware for conditional requests
export const etagMiddleware = (
  req,
  res,
  next
) => {
  const originalJson = res.json;

  res.json = function (data) {
    // Only set ETag for GET requests
    if (req.method === "GET") {
      const hash = crypto
        .createHash("md5")
        .update(JSON.stringify(data))
        .digest("hex");

      res.set("ETag", `"${hash}"`);

      // Check If-None-Match header
      if (
        req.get("If-None-Match") ===
        `"${hash}"`
      ) {
        return res.status(304).end();
      }
    }

    return originalJson.call(this, data);
  };

  next();
};
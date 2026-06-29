// Image optimization utilities

// Generate optimized image URL with ImageKit parameters
export const getOptimizedImageUrl = (imageUrl, options = {}) => {
  if (!imageUrl) return null;

  const {
    width = 800,
    height = 600,
    quality = 80,
    format = "webp",
    fit = "contain",
    crop = false,
  } = options;

  // If using ImageKit
  if (imageUrl.includes("imagekit.io")) {
    const params = [];

    if (width) params.push(`w-${width}`);
    if (height) params.push(`h-${height}`);
    if (quality) params.push(`q-${quality}`);
    if (format && format !== "jpg") params.push(`f-${format}`);
    if (crop) params.push(`c-${crop}`);

    const pathParts = imageUrl.split("/upload/");
    if (pathParts.length === 2) {
      return `${pathParts[0]}/upload/${params.join(",")}/${pathParts[1]}`;
    }
  }

  return imageUrl;
};

// Generate responsive image srcset
export const generateSrcSet = (imageUrl) => {
  if (!imageUrl) return "";

  return [
    { size: 300, descriptor: "300w" },
    { size: 600, descriptor: "600w" },
    { size: 900, descriptor: "900w" },
    { size: 1200, descriptor: "1200w" },
  ]
    .map(
      ({ size, descriptor }) =>
        `${getOptimizedImageUrl(imageUrl, { width: size })} ${descriptor}`,
    )
    .join(", ");
};

// Preload image
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload images
export const preloadImages = async (urls) => {
  return Promise.allSettled(urls.map(preloadImage));
};

// Image compression recommendations
export const imageCompressionGuidelines = {
  thumbnail: { width: 150, height: 150, quality: 70 },
  card: { width: 400, height: 300, quality: 80 },
  gallery: { width: 800, height: 600, quality: 85 },
  hero: { width: 1200, height: 800, quality: 85 },
  fullscreen: { width: 1920, height: 1080, quality: 80 },
};

// Get optimized URL based on device
export const getResponsiveImageUrl = (imageUrl, size = "card") => {
  const config =
    imageCompressionGuidelines[size] || imageCompressionGuidelines.card;
  return getOptimizedImageUrl(imageUrl, config);
};

// ImageKit transformation builder
export const ImageKitBuilder = class {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.transformations = [];
  }

  resize(width, height) {
    this.transformations.push(`w-${width},h-${height}`);
    return this;
  }

  quality(q) {
    this.transformations.push(`q-${q}`);
    return this;
  }

  format(fmt) {
    this.transformations.push(`f-${fmt}`);
    return this;
  }

  crop(c) {
    this.transformations.push(`c-${c}`);
    return this;
  }

  blur(b) {
    this.transformations.push(`bl-${b}`);
    return this;
  }

  opacity(o) {
    this.transformations.push(`o-${o}`);
    return this;
  }

  rotate(r) {
    this.transformations.push(`rt-${r}`);
    return this;
  }

  build() {
    if (this.transformations.length === 0) return this.baseUrl;

    const pathParts = this.baseUrl.split("/upload/");
    if (pathParts.length !== 2) return this.baseUrl;

    return `${pathParts[0]}/upload/${this.transformations.join(",")}/${pathParts[1]}`;
  }
};

// Image lazy loading with blur effect
export const createBlurHash = (width, height) => {
  // Returns a data URL for a blurred placeholder
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Create a light gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f0f0f0");
  gradient.addColorStop(1, "#e0e0e0");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Validate image before upload
export const validateImage = (file, maxSize = 5242880) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Only JPEG, PNG, WebP, and GIF images are allowed",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Image size must be less than ${formatFileSize(maxSize)}`,
    };
  }

  return { valid: true };
};

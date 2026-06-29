// Query optimization utilities

// Select only needed fields to reduce data transfer
export const selectFields = {
  listing:
    "name description address regularPrice discountPrice bedrooms bathrooms imageUrls userRef createdAt",
  listingFull: "-__v", // Include all except __v
  user: "username email avatar createdAt",
  userPublic: "username avatar createdAt",
};

// Common database indexes for listings
export const listingIndexes = [
  // Single field indexes
  { userRef: 1 },
  { createdAt: -1 },
  { regularPrice: 1 },
  { name: "text", description: "text", address: "text" }, // Text search index

  // Compound indexes
  { userRef: 1, createdAt: -1 }, // For getting user listings
  { regularPrice: 1, createdAt: -1 }, // For price filtering with sorting
  { bedrooms: 1, bathrooms: 1, createdAt: -1 }, // For room filtering
];

// Common indexes for users
export const userIndexes = [
  { email: 1 }, // Email uniqueness
  { username: 1 }, // Username lookup
  { createdAt: -1 }, // User registration timeline
];

// Optimize query with lean() for read-only operations
export const optimizeQuery = (query, lean = true) => {
  // lean() returns plain JavaScript objects instead of Mongoose documents
  // This significantly improves performance for read-only queries
  if (lean) {
    query = query.lean();
  }

  // If the query is already executed, return it as is
  return query;
};

// Batch processing for bulk operations
export const batchProcess = async (items, processFn, batchSize = 100) => {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((item) => processFn(item)),
    );
    results.push(...batchResults);
  }

  return results;
};

// Database connection pooling config
export const mongooseConfig = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5, // Maintain at least 5 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  connectTimeoutMS: 10000, // Connection timeout
  retryWrites: true,
  retryReads: true,
};

// Query execution monitoring
export const monitorQueryPerformance = (query) => {
  const startTime = Date.now();

  return {
    onComplete: () => {
      const duration = Date.now() - startTime;
      if (duration > 1000) {
        console.warn(
          `[SLOW QUERY] Execution time: ${duration}ms, Query: ${query}`,
        );
      }
      return duration;
    },
  };
};

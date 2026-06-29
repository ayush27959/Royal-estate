// Pagination middleware for list endpoints
export const getPaginationParams = (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  req.pagination = {
    page,
    limit,
    skip,
  };

  next();
};

// Pagination response formatter
export const formatPaginationResponse = (data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
};

// Query builder with pagination
export const buildPaginatedQuery = (Model, filter = {}, options = {}) => {
  const {
    skip = 0,
    limit = 10,
    sort = { createdAt: -1 },
    select = null,
    populate = [],
  } = options;

  let query = Model.find(filter);

  // Select specific fields
  if (select) {
    query = query.select(select);
  }

  // Populate relations
  if (populate.length > 0) {
    populate.forEach((p) => {
      query = query.populate(p);
    });
  }

  // Apply sorting
  query = query.sort(sort);

  // Get total count (before pagination)
  const countQuery = Model.countDocuments(filter);

  // Apply pagination
  query = query.skip(skip).limit(limit);

  return {
    query,
    countQuery,
  };
};

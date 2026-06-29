// Form validation utilities for frontend
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[@$!%*#?&]/.test(password)) {
    return "Password must contain at least one special character (@$!%*#?&)";
  }
  return null;
};

export const validateUsername = (username) => {
  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }
  if (username.length > 30) {
    return "Username must be less than 30 characters";
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return "Username can only contain letters, numbers, underscore and hyphen";
  }
  return null;
};

// Listing validation
export const validateListing = (listing) => {
  const errors = {};

  if (!listing.title || listing.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters";
  }
  if (listing.title && listing.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  if (!listing.description || listing.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters";
  }
  if (listing.description && listing.description.length > 2000) {
    errors.description = "Description must be less than 2000 characters";
  }

  if (!listing.address || listing.address.trim().length === 0) {
    errors.address = "Address is required";
  }

  if (!listing.price || listing.price <= 0) {
    errors.price = "Price must be a positive number";
  }

  if (!listing.bedrooms || listing.bedrooms < 1) {
    errors.bedrooms = "Bedrooms must be at least 1";
  }

  if (!listing.bathrooms || listing.bathrooms < 1) {
    errors.bathrooms = "Bathrooms must be at least 1";
  }

  if (!listing.area || listing.area <= 0) {
    errors.area = "Area must be a positive number";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

// Sign up form validation
export const validateSignUpForm = (formData) => {
  const errors = {};

  if (!formData.username || formData.username.trim().length === 0) {
    errors.username = "Username is required";
  } else {
    const usernameError = validateUsername(formData.username);
    if (usernameError) errors.username = usernameError;
  }

  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please provide a valid email";
  }

  if (!formData.password || formData.password.length === 0) {
    errors.password = "Password is required";
  } else {
    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

// Sign in form validation
export const validateSignInForm = (formData) => {
  const errors = {};

  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please provide a valid email";
  }

  if (!formData.password || formData.password.length === 0) {
    errors.password = "Password is required";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

// Generic form validator
export const validateForm = (data, schema) => {
  const errors = {};

  for (const field in schema) {
    const rules = schema[field];
    const value = data[field];

    if (rules.required && (!value || value.toString().trim().length === 0)) {
      errors[field] = rules.requiredMessage || `${field} is required`;
      continue;
    }

    if (value && rules.minLength && value.toString().length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
      continue;
    }

    if (value && rules.maxLength && value.toString().length > rules.maxLength) {
      errors[field] =
        `${field} must be less than ${rules.maxLength} characters`;
      continue;
    }

    if (value && rules.pattern && !rules.pattern.test(value.toString())) {
      errors[field] = rules.patternMessage || `${field} format is invalid`;
      continue;
    }

    if (value && rules.min && Number(value) < rules.min) {
      errors[field] = `${field} must be at least ${rules.min}`;
      continue;
    }

    if (value && rules.max && Number(value) > rules.max) {
      errors[field] = `${field} must be at most ${rules.max}`;
      continue;
    }

    if (value && rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

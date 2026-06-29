import toast from "react-hot-toast";

// Handle API errors with consistent response format
export const handleApiError = (
  error,
  defaultMessage = "Something went wrong",
) => {
  let errorMessage = defaultMessage;
  let statusCode = 500;

  // Axios error
  if (error.response) {
    statusCode = error.response.status;
    errorMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      errorMessage;

    // Handle validation errors
    if (error.response.data?.errors) {
      const errors = error.response.data.errors;
      if (Array.isArray(errors)) {
        errorMessage = errors.map((e) => e.message || e).join(", ");
      } else if (typeof errors === "object") {
        errorMessage = Object.values(errors).join(", ");
      }
    }
  }
  // Network error
  else if (error.request) {
    errorMessage = "Network error. Please check your connection.";
  }
  // Request setup error
  else {
    errorMessage = error.message || defaultMessage;
  }

  return {
    message: errorMessage,
    statusCode,
    isValidationError: statusCode === 400,
  };
};

// Toast notification helpers
export const showErrorToast = (
  error,
  defaultMessage = "Something went wrong",
) => {
  const { message } = handleApiError(error, defaultMessage);
  toast.error(message);
  return message;
};

export const showSuccessToast = (message = "Success!") => {
  toast.success(message);
};

export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message);
};

// Retry logic for API calls
export const retryApiCall = async (apiCall, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, delay * Math.pow(2, i)),
      );
    }
  }
};

// Parse field errors from API response
export const parseFieldErrors = (error) => {
  const fieldErrors = {};

  if (error.response?.data?.errors) {
    const errors = error.response.data.errors;
    if (Array.isArray(errors)) {
      errors.forEach((err) => {
        if (err.field) {
          fieldErrors[err.field] = err.message;
        }
      });
    } else if (typeof errors === "object") {
      Object.assign(fieldErrors, errors);
    }
  }

  return fieldErrors;
};

import toast from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message || "Success!", {
    duration: 3000,
    style: {
      background: "#10b981",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "500",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message || "Something went wrong!", {
    duration: 4000,
    style: {
      background: "#ef4444",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "500",
    },
  });
};

export const showLoadingToast = (message) => {
  return toast.loading(message || "Loading...", {
    style: {
      background: "#3b82f6",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "500",
    },
  });
};

export const showInfoToast = (message) => {
  toast(message || "Info", {
    duration: 3000,
    icon: "ℹ️",
    style: {
      background: "#0ea5e9",
      color: "#fff",
      borderRadius: "8px",
      fontWeight: "500",
    },
  });
};

export const updateToast = (toastId, message, type = "success") => {
  const styles = {
    success: {
      background: "#10b981",
      color: "#fff",
    },
    error: {
      background: "#ef4444",
      color: "#fff",
    },
    info: {
      background: "#0ea5e9",
      color: "#fff",
    },
  };

  toast(message, {
    id: toastId,
    duration: 3000,
    style: {
      ...styles[type],
      borderRadius: "8px",
      fontWeight: "500",
    },
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

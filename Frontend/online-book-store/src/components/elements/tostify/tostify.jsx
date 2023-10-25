import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessNotification = (message, onClose) => {
  return toast.success(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => {
      onClose();
    },
  });
};

export const showErrorNotification = (message) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showInfoNotification = (message) => {
  toast.info(message);
};

export const showWarningNotification = (message) => {
  toast.warning(message);
};

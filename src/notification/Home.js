import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

export const notifyBuyNowSuccess = () => {
  toast.success(`__Thank you for shopping !__ Account > my orders.`, {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};

export const notifyBuyNowFailed = () => {
  toast.error(`Order Failed !`, {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};

export const notifyDeleteProductSuccess = () => {
  toast.success("Deleted !", {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};

export const notifyDeleteProductFailed = () => {
  toast.error(`deletion failed !`, {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};

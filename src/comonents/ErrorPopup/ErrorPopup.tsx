import { useEffect } from "react";

type ErrorPopupProps = {
  message: string;
  onClose: () => void;
};

const ErrorPopup = ({ message, onClose }: ErrorPopupProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
      <div className="flex items-center">
        <span className="block sm:inline">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-red-700 hover:text-red-900"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;

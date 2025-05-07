// components/Toast.jsx
import { useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeConfig = {
    success: {
      bg: "bg-green-100",
      text: "text-green-600",
      icon: <CheckCircleIcon className="w-full h-full" />,
      label: "Sukses",
    },
    error: {
      bg: "bg-rose-100",
      text: "text-rose-600",
      icon: <XCircleIcon className="w-full h-full" />,
      label: "Gagal",
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      icon: <ExclamationTriangleIcon className="w-full h-full" />,
      label: "Warning",
    },
    info: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <InformationCircleIcon className="w-full h-full" />,
      label: "Info",
    },
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`grid grid-cols-[auto,1fr] gap-3 items-stretch p-4 rounded shadow-md w-80 ${config.bg}`}
      >
        <div className="flex items-center justify-center w-10">
          <div className={`w-full h-full flex items-center justify-center ${config.text}`}>
            {config.icon}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className={`font-semibold ${config.text}`}>{config.label}</span>
          <span className={`text-sm mt-1 ${config.text}`}>{message}</span>
        </div>
      </div>
    </div>
  );
}

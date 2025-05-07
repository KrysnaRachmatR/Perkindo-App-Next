import { useEffect } from "react";
import { CircleX, CircleCheck } from "lucide-react";

interface ConfirmModalProps {
  show: boolean;
  mode: "confirm" | "delete";
  message: string;
  onClose: (confirmed: boolean) => void;
}

const ConfirmModal = ({ show, mode, message, onClose }: ConfirmModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!show) return null;

  const color = mode === "delete" ? "rose" : "green";
  const title = mode === "delete" ? "Konfirmasi" : "Konfirmasi";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="mb-2 w-full flex justify-center">
            {mode === "delete" ? (
                <CircleX className="text-rose-600 w-12 h-12" />
            ):(
                <CircleCheck className="text-green-600 w-12 h-12" />
            )}
        </div>
        <h2 className={`text-lg text-center font-semibold text-${color}-600 mb-4`}>{title}</h2>
        <p className="text-sm text-center text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            onClick={() => onClose(true)}
            className={`px-4 py-2 text-sm text-white bg-${color}-600 rounded hover:bg-${color}-700`}
          >
            Lanjutkan
            {/* {mode === "delete" ? "Hapus" : "Lanjutkan"} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

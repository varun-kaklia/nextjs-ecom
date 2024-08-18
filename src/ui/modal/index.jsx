import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

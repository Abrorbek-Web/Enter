import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Add Report</h2>
        <form>
          {/* Form fields go here */}
          <div className="mb-4">
            <label className="block text-gray-700">Report Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Modal };

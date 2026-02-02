import { type JSX } from 'react';

export interface ConfirmDialogModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialogModal = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogModalProps): JSX.Element => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold text-gray-800">{message}</h2>
        </div>

        {/*<div className="mb-4">{message}</div>*/}
        <div className="flex gap-3 justify-end p-6">
          <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300 transition">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition">Delete</button>
        </div>
      </div>
    </div>
  );
  }

export default ConfirmDialogModal;
function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-[420px] border border-white/10 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Delete Chat?
        </h2>

        <p className="text-sm md:text-base text-muted mb-6">
          This verification history will be permanently deleted.
        </p>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 w-full sm:w-auto"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
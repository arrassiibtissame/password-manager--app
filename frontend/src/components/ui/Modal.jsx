function Modal ({open,onClose,children}){
    if (!open)return null;
    return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      {/* CLICK OUTSIDE TO CLOSE */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      {/* MODAL CONTENT */}
      <div className="relative bg-gray-900 p-6 rounded-xl w-[400px] z-10">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {children}

      </div>
    </div>
  );
}

export default Modal;
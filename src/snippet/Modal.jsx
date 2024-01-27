import React from "react";

function Modal({ show, children, onClose }) {
  if (!show) {
    return null;
  }
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        zIndex: 10000000,
        top: 0,
        position: "fixed",
        left: 0,
      }}
      onClick={onClose}
      className="modal_container"
    >
      <div
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          zIndex: 20000,
          position: "relative",
        }}
      >
        <div className="modal_children">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

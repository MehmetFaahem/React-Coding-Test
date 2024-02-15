import React, { useEffect, useState } from "react";

function Modal({ show, children, onClose, id, onScroll }) {
  if (!show) {
    return null;
  }
  return (
    <div
      id={id}
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
        className="flex w-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          zIndex: 20000,
          position: "relative",
        }}
      >
        <div className="modal_children" onScroll={onScroll}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;

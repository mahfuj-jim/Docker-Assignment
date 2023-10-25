import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Modal = (children, isOpen, onCloseModal) => {
  return (
    <Modal open={isOpen} onClose={onCloseModal} center>
      {...children}
    </Modal>
  );
};

export default Modal;

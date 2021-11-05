import React from "react";
import Modal from "react-modal";
import Button from "./button";
import "./modal.styles.scss";

const CustomModal = (props) => {
  const { isOpen, closeModal, afterOpenModal, onAccept, children, title } =
    props;

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="overlay"
    >
      <p className="title">{title}</p>
      {children}
      <div className="buttonContainer">
        <Button onClick={closeModal} className="modal__button">
          CANCEL
        </Button>
        <Button onClick={onAccept} primary>
          ACCEPT
        </Button>
      </div>
    </Modal>
  );
};

export default CustomModal;

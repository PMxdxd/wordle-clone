import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

type Props = {
  showModal: boolean;
  closeModal: () => void;
};

export const Result = ({ showModal, closeModal }: Props) => {
    const handleCloseModan = () =>{
        closeModal()
    }
  return (
    <div>
      <Modal
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        onRequestClose={handleCloseModan}
      >
        {"test"}
      </Modal>
    </div>
  );
};

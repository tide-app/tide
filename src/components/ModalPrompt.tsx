import React from "react";
import Modal from "react-modal";
import { IonIcon } from "@ionic/react";
import { closeSharp } from "ionicons/icons";

interface Props {
  title: string;
  isOpen: boolean;
  confirmMessage: string;
  denyMessage: string;
  longMessage: string;
  onClose: () => void;
  onRequestClose: () => void;
  onConfirm: () => void;
}

export default function ModalPrompt({
  title,
  isOpen = false,
  onRequestClose,
  onConfirm,
  onClose,
  confirmMessage,
  denyMessage,
  longMessage,
}: Props) {
  return (
    <Modal
      className="Modal bg-primary border-2 border-secondary color-secondary max-w-xl mx-auto my-48 outline-none px-2 py-1 relative text-secondary"
      contentLabel="Window confirming visit to Freesound"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // Really important!
      // The above line appears to be what allows users
      // to exit the Modal by simply hitting the Esc key
      // or clicking anywhere else on the page.
      // Please keep onRequestClose={closeModal} in here
      // in future iterations for
      // an improved user experience.
      overlayClassName="bg-primary fixed inset-0 Modal z-10"
      closeTimeoutMS={200}
    >
      <button className="m-2 absolute top-0 right-0" onClick={onClose}>
        <IonIcon icon={closeSharp} size="large" />
      </button>
      <section className="ml-6 pb-6 pt-2 text-lg">
        <h1 className="pb-4 pt-3 text-2xl">{title}</h1>
        <p>{longMessage}</p>
        <br />
        <span className="mx-8 space-x-10 space-y-4">
          <button
            className="bg-secondary text-primary border px-8 py-2 rounded-lg"
            onClick={onConfirm}
          >
            {confirmMessage}
          </button>
          <button className="border px-10 py-2 rounded-lg" onClick={onClose}>
            {denyMessage}
          </button>
        </span>
      </section>
    </Modal>
  );
}

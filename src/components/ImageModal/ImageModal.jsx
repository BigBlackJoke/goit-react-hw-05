import ReactModal from "react-modal";

export default function ImageModal({ isOpen, onClose, imageSrc, imageDesc }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
    overlay: {
      backgroundColor: "rgb(0,0,0,0.7)",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={imageDesc}
      style={customStyles}
      appElement={document.getElementById("root") || undefined}
    >
      <img style={{ display: "block" }} src={imageSrc} alt={imageDesc} />
    </ReactModal>
  );
}
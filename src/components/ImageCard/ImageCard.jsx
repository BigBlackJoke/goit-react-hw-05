import css from "./ImageCard.module.css";

export default function ImageCard({ imageData, onOpenModal }) {
  return (
    <div>
      <img
        className={css.card}
        src={imageData.urls.small}
        alt={imageData.description}
        onClick={() =>
          onOpenModal(imageData.urls.regular, imageData.description)
        }
      />
    </div>
  );
}
import "./boardModal.scss";

export default function BoardModal({ isOpen, closeModal }) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="board__modal">
        <button className="board__modal-button" onClick={closeModal}>
          Back
        </button>
        <button className="board__modal-button">Restart</button>
        <button className="board__modal-button">Settings</button>
        <button className="board__modal-button">Main Menu</button>
      </div>
    </div>
  );
}

export function FrontCard({ selectedCharacter }) {
  return (
    <div className="character__card-front">
      <img
        src={selectedCharacter.inventoryAvatar}
        alt={selectedCharacter.name}
        className="character__avatar"
      />
      <div className="character__info">
        <h2>{selectedCharacter.name}</h2>
        <p className="character__info-class">{selectedCharacter.class}</p>
        <p className="character__info-bio">{selectedCharacter.bio}</p>
      </div>
    </div>
  );
}

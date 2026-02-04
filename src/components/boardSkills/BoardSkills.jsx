import "./boardSkills.scss";

export default function BoardSkills({
  character,
  levelStatus,
  isBoardBlocked,
  onSkillClick,
}) {
  return (
    <div className="skills">
      {character.skills.map((skill) => (
        <button
          key={skill.id}
          className="skill-button"
          disabled={skill.charges <= 0 || isBoardBlocked || levelStatus}
          onClick={() => onSkillClick(skill)}
        >
          <img src={skill.sprite} alt={skill.id} className="skill-image" />
          <div className="skill-name">
            {/* {skill.name} ({skill.charges}) */}
          </div>
        </button>
      ))}
    </div>
  );
}

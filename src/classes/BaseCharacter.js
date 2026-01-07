export default class BaseCharacter {
  constructor() {
    (this.name = ""), (this.class = ""), (this.skills = []);
  }

  getSkill(skillId) {
    return this.skills.find((skill) => skill.id === skillId);
  }

  canUseSkill(skillId) {
    const skill = this.getSkill(skillId);
    return skill && skill.charges > 0;
  }

  useSkill(skillId, context) {
    const skill = this.getSkill(skillId);
    if (!skill || skill.charges <= 0) return;

    skill.effect(context);
    skill.charges -= 1;
  }
}

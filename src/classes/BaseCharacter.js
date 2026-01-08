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
}

export type DadosUserSkillsType = {
    userSkillId: number,
    user: number,
    skill: {
        skillId: number,
        skillName: string,
        skillVersion: string,
        skillDescription: string,
        skillImage: string
    },
    knowledgeLevel: number,
    createdAt: string,
    updatedAt: string,
}
import { skills } from "./skills.js"

export function parseSkills(jobDescription: string | null) {
    if (!jobDescription) {
        return [];
    }

    const foundSkills: string[] = []

    for (const skill of skills) {
        for (const alias of skill.aliases) {
            if (containsAlias(jobDescription, alias)) {
                foundSkills.push(skill.name);
                break;
            }
        }
    }

    return foundSkills;
}

function containsAlias(text: string, alias: string): boolean {
    const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`\\b${escapedAlias}\\b`, "i");

    return regex.test(text);
}
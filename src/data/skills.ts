import htmlLogo from "../assets/logos/html.svg"
import cssLogo from "../assets/logos/css.svg"
import jsLogo from "../assets/logos/js.svg"
import tsLogo from "../assets/logos/ts.svg"
import reactLogo from "../assets/logos/react.svg"
import tailwindLogo from "../assets/logos/tailwind.svg"
import nodeLogo from "../assets/logos/node.svg"
import astroLogo from "../assets/logos/astro.svg"
import dockerLogo from "../assets/logos/docker.svg"
import goLogo from "../assets/logos/go.svg"
import wpLogo from "../assets/logos/wp.svg"
import luaLogo from "../assets/logos/lua.svg"
import pythonLogo from "../assets/logos/python.svg"
import gitLogo from "../assets/logos/git.svg"
import nextLogo from "../assets/logos/next.svg"
import mongoLogo from "../assets/logos/mongo.svg"
import figmaLogo from "../assets/logos/figma.svg"
import adobeLogo from "../assets/logos/adobe.svg"
import postgresLogo from "../assets/logos/postgres.svg"
import sqliteLogo from "../assets/logos/sqlite.svg"
import prismaLogo from "../assets/logos/prisma.svg"
import reactRouterLogo from "../assets/logos/react-router.svg"

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design' | 'database'

export enum ProficiencyLevel {
	BEGINNER = "beginner",
	INTERMEDIATE = "intermediate",
	ADVANCED = "advanced",
	EXPERT = "expert",
}

export interface Skill {
	name: string
	logo: string
	category: SkillCategory
	proficiency?: ProficiencyLevel
}

export const skills: Skill[] = [
	{ name: "HTML5", logo: htmlLogo.src, category: 'frontend', proficiency: ProficiencyLevel.EXPERT },
	{ name: "CSS3", logo: cssLogo.src, category: 'frontend', proficiency: ProficiencyLevel.EXPERT },
	{ name: "JavaScript", logo: jsLogo.src, category: 'frontend', proficiency: ProficiencyLevel.ADVANCED},
	{ name: "TypeScript", logo: tsLogo.src, category: 'frontend', proficiency: ProficiencyLevel.ADVANCED},
	{ name: "React", logo: reactLogo.src, category: 'frontend', proficiency: ProficiencyLevel.ADVANCED},
	{ name: "React Router", logo: reactRouterLogo.src, category: 'frontend', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Tailwind", logo: tailwindLogo.src, category: 'frontend', proficiency: 'expert' },
	{ name: "Next.js", logo: nextLogo.src, category: 'frontend', proficiency: 'advanced' },
	{ name: "Node.js", logo: nodeLogo.src, category: 'backend', proficiency: 'advanced' },
	{ name: "Python", logo: pythonLogo.src, category: 'backend', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Golang", logo: goLogo.src, category: 'backend', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Lua", logo: luaLogo.src, category: 'backend', proficiency: 'beginner' },
	{ name: "MongoDB", logo: mongoLogo.src, category: 'database', proficiency: 'beginner' },
	{ name: "SQLite", logo: sqliteLogo.src, category: 'database', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "PostgreSQL", logo: postgresLogo.src, category: 'database', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Prisma ORM", logo: prismaLogo.src, category: 'database', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Astro", logo: astroLogo.src, category: 'tools', proficiency: 'advanced' },
	{ name: "Docker", logo: dockerLogo.src, category: 'tools', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Git", logo: gitLogo.src, category: 'tools', proficiency: 'advanced' },
	{ name: "Wordpress", logo: wpLogo.src, category: 'tools', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Figma", logo: figmaLogo.src, category: 'design', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Adobe", logo: adobeLogo.src, category: 'design', proficiency: ProficiencyLevel.INTERMEDIATE},
	{ name: "Cloudflare", logo: adobeLogo.src, category: 'design', proficiency: 'beginner' },
]

export const skillsByCategory = skills.reduce((acc, skill) => {
	if (!acc[skill.category]) {
		acc[skill.category] = []
	}
	acc[skill.category].push(skill)
	return acc
}, {} as Record<SkillCategory, Skill[]>)

export const categoryLabels: Record<SkillCategory, string> = {
	frontend: 'Frontend',
	backend: 'Backend',
	tools: 'Tools & DevOps',
	database: 'Database',
	design: 'Design'
}

export const PROFICIENCY_LEVELS: Record<ProficiencyLevel, { label: string; order: number }> = {
	beginner: { label: 'Beginner', order: 1 },
	intermediate: { label: 'Intermediate', order: 2 },
	advanced: { label: 'Advanced', order: 3 },
	expert: { label: 'Expert', order: 4 }
} as const



export function filterSkillsByProficiency(skills: Skill[], proficiency: ProficiencyLevel | 'all'): Skill[] {
	if (proficiency === 'all') return skills
	return skills.filter(skill => skill.proficiency === proficiency)
}

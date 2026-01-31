export interface Project {
	id: string
	title: string
	description: string
	longDescription?: string
	image: string
	tags: string[]
	demoUrl?: string
	githubUrl?: string
	liveDemo: boolean
	year: number
	status: 'completed' | 'in-progress' | 'prototype'
	techStack: string[]
}

export const projects: Project[] = [
	{
		id: 'convert',
		title: 'convert.nvim',
		description: 'A Neovim plugin to help with css unit conversions',
		longDescription: 'A nvim plugin written in lua allowing for unit, size and number conversions.  Including docs and config.',
		image: '/convert-banner.webp',
		tags: ['Lua', 'Plugin', 'Tools', 'Nvim'],
		githubUrl: 'https://github.com/cjodo/convert.nvim',
		liveDemo: false,
		year: 2024,
		status: 'completed',
		techStack: ['Neovim', 'Lua', 'Plugin' ]
	},
	{
		id: 'ahas',
		title: 'AHAS Website',
		description: 'A charity vet website located in Edmonton. Built with a headless cms',
		longDescription: '',
		image: '/convert-banner.webp',
		tags: ['Headless', 'Typescript', 'CMS'],
		liveDemo: true,
		demoUrl: 'https://ahas.ca',
		year: 2026,
		status: 'in-progress',
		techStack: ['Cockpit CMS', 'TypeScript', 'Astro', 'React', 'Tailwind CSS' ]
	},
	{
		id: 'comforts-from-home',
		title: 'Comforts from Home',
		description: 'A wordpress e-commerce site for hand knit local goods',
		longDescription: '',
		image: '/convert-banner.webp',
		liveDemo: true,
		tags: [ 'CMS' , 'Wordpress' ],
		demoUrl: 'https://comfortsfromhome.shop',
		githubUrl: '',
		year: 2023,
		status: 'in-progress',
		techStack: [ 'Wordpress' ]
	},
]

export const completedProjects = projects.filter(project => project.status === 'completed')
export const inProgressProjects = projects.filter(project => project.status === 'in-progress')

export const projectStatusLabels = {
	'completed': 'Completed',
	'in-progress': 'In Progress',
	'prototype': 'Prototype'
} as const

export function getProjectById(id: string): Project | undefined {
	return projects.find(project => project.id === id)
}

export function getProjectsByTag(tag: string): Project[] {
	return projects.filter(project => 
		project.tags.some(projectTag => 
			projectTag.toLowerCase().includes(tag.toLowerCase())
		)
	)
}

export function getProjectsByYear(year: number): Project[] {
	return projects.filter(project => project.year === year)
}

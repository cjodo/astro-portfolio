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
		image: '/projects/ecommerce.jpg',
		tags: ['Lua', 'Plugin', 'Tools', 'Nvim'],
		demoUrl: 'https://demo.example.com',
		githubUrl: 'https://github.com/cjodo/convert.nvim',
		liveDemo: false,
		year: 2024,
		status: 'completed',
		techStack: ['Neovim', 'Lua' ]
	},
	{
		id: 'ahas',
		title: 'AHAS Website',
		description: 'A charity vet website located in Edmonton. Built with a headless cms',
		longDescription: '',
		image: '/projects/task-app.jpg',
		tags: ['Headless', 'Typescript', 'CMS'],
		liveDemo: true,
		demoUrl: 'https://tasks.example.com',
		githubUrl: '',
		year: 2026,
		status: 'in-progress',
		techStack: ['Cockpit CMS', 'TypeScript', 'Astro', 'React' ]
	},
	{
		id: 'comforts-from-home',
		title: 'Comforts from Home',
		description: 'A wordpress e-commerce site for hand knit local goods',
		longDescription: '',
		image: '/projects/weather.jpg',
		liveDemo: true,
		tags: ['JavaScript', 'API Integration', 'Charts'],
		demoUrl: 'https://weather.example.com',
		githubUrl: '',
		year: 2023,
		status: 'in-progress',
		techStack: ['JavaScript', 'Chart.js', 'OpenWeather API', 'Geolocation API']
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

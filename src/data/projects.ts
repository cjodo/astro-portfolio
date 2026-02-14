export interface Project {
	id: string
	title: string
	description: string
	longDescription?: string
	image: ImageMetadata
	tags: string[]
	demoUrl?: string
	githubUrl?: string
	liveDemo: boolean
	year: number
	status: 'completed' | 'in-progress' | 'prototype'
	techStack: string[]
}

import ahasHome from '../assets/images/ahas-home.png';
import comfortsHome from '../assets/images/comforts-home.png';
import convertBanner from '../assets/images/convert-banner.webp';

export const projects: Project[] = [
	{
		id: 'convert',
		title: 'convert.nvim',
		description: 'A Neovim plugin to help with css unit conversions',
		longDescription: 'A nvim plugin written in lua allowing for unit, size and number conversions.  Including docs and config.',
		image: convertBanner,
		tags: ['Lua', 'Plugin', 'Tools', 'Nvim'],
		githubUrl: 'https://github.com/cjodo/convert.nvim',
		liveDemo: false,
		year: 2024,
		status: 'completed',
		techStack: ['Neovim', 'Lua', 'Plugin' ]
	},
	{
		id: 'ahas',
		title: 'Alberta Helping Animals Society',
		description: 'A charity vet website located in Edmonton. Built with a headless cms, Astro and React',
		longDescription: '',
		image: ahasHome,
		tags: ['Headless', 'Typescript', 'CMS'],
		liveDemo: true,
		demoUrl: 'https://staging.ahas.ca',
		year: 2026,
		status: 'in-progress',
		techStack: ['Cockpit CMS', 'TypeScript', 'Astro', 'React', 'Tailwind CSS', 'Rest API' ]
	},
	{
		id: 'comforts-from-home',
		title: 'Comforts from Home',
		description: 'A wordpress e-commerce site for hand knit local goods',
		longDescription: '',
		image: comfortsHome,
		liveDemo: true,
		tags: [ 'CMS' , 'Wordpress' ],
		demoUrl: 'https://comfortsfromhome.shop',
		githubUrl: '',
		year: 2023,
		status: 'in-progress',
		techStack: [ 'Wordpress', 'Woocommerce' ]
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

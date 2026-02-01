export interface AnimationProps {
	delay?: number
	duration?: number
	threshold?: number
	rootMargin?: string
}

export interface AnimationObserverOptions {
	threshold?: number
	rootMargin?: string
}

export class AnimationObserver {
	private observer: IntersectionObserver
	private elements: Set<Element> = new Set()

	constructor(options: AnimationObserverOptions = {}) {
		const { threshold = 0.15, rootMargin = '0px' } = options
		
		this.observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('show')
						this.observer.unobserve(entry.target)
						this.elements.delete(entry.target)
					}
				})
			},
			{ threshold, rootMargin }
		)
	}

	observe(element: Element): void {
		if (this.elements.has(element)) return
		this.observer.observe(element)
		this.elements.add(element)
	}

	observeAll(selector: string): void {
		document.querySelectorAll(selector).forEach(el => this.observe(el))
	}

	disconnect(): void {
		this.observer.disconnect()
		this.elements.clear()
	}
}

export const getAnimationDelay = (index: number, baseDelay: number = 80): string => {
	return `${index * baseDelay}ms`
}

export const getStaggerClass = (): string => {
	return `animate-stagger` as const
}

export const getAnimationClass = (type: 'fade-up' | 'scale-in' = 'fade-up'): string => {
	return `animate-${type}` as const
}

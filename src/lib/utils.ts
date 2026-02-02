
//calculates reading time for an article
export const calculateReadingTime = (text: string, wpm: number = 225): number => {
	const words = text.trim().split(/\s+/).length;
	const minutes = words / wpm;
	const readTime = Math.ceil(minutes);
	return readTime;
}


//calculates reading time for an article
export const calculateReadingTime = (text: string, wpm: number = 225): number => {
	const words = text.trim().split(/\s+/).length;
	const minutes = words / wpm;
	const readTime = Math.ceil(minutes);
	return readTime;
}

export const getRepoStarCount = async (repo: string) => {
	const res = await fetch(`https://api.github.com/repos/cjodo/${repo}`);
	const data = await res.json();

	const stars = data["stargazers_count"];
	return stars
}

export const extractRepoName = (url: string) => {
	try {
		// Remove any trailing slash
		url = url.replace(/\/$/, "");

		// Match the part after github.com/username/
		const match = url.match(/github\.com\/[^\/]+\/([^\/]+)$/);
		if (match) {
			return match[1];
		} else {
			throw new Error("Invalid GitHub URL");
		}
	} catch (e: any) {
		console.error(e.message);
		return null;
	}


}

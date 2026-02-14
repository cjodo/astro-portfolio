import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { db, BlogPosts, eq } from 'astro:db';

export async function GET(context: APIContext) {
	const posts = await db.select().from(BlogPosts).where(eq(BlogPosts.published, true));
	
	return rss({
		title: 'Curtis O\'Donnell - Blog',
		description: 'Full-stack developer sharing web development insights, tutorials, and project updates.',
		site: context.site?.toString() || 'https://cjodo.com',
		items: posts.map((post) => ({
			title: post.title,
			pubDate: post.date,
			description: post.excerpt,
			link: `/blog/${post.slug}/`,
		})),
		customData: `<language>en-us</language>`,
	});
}

import { db, BlogPosts, Tags, PostTags, and } from 'astro:db';
import { eq } from 'astro:db'; // adjust for your DB

export default async function seed() {
	const tags = [
		{ id: 'astro', name: 'Astro', slug: 'astro' },
		{ id: 'md', name: 'Markdown', slug: 'markdown' },
		{ id: 'webdev', name: 'Web Development', slug: 'webdev' },
	];

	for (const tag of tags) {
		const exists = await db.select().from(Tags).where(eq(Tags.id, tag.id));
		if (exists.length === 0) {
			await db.insert(Tags).values(tag);
			console.log(`Inserted tag: ${tag.name}`);
		}
	}

	// 3. Seed blog posts
	const posts = [
		{
			title: 'Hello World',
			slug: 'hello-world',
			date: new Date(),
			excerpt: 'Your first post in Astro!',
			content: `
# Hello World

Welcome to our Astro blog! This post demonstrates Markdown content.

- Built with **Astro**
- Supports Markdown
- Easy to extend
`,
			categoryId: 'tech',
			tags: ['astro', 'md'],
			readTime: 2,
			published: true,
		},
		{
			title: 'Astro Tips',
			slug: 'astro-tips',
			date: new Date(),
			excerpt: 'Top 5 tips for working with Astro.',
			content: `
# Astro Tips

1. Keep components small
2. Use Markdown for blog posts
3. Prefetch images for faster load
4. Use static builds when possible
5. Explore Astro integrations
`,
			categoryId: 'tech',
			tags: ['astro', 'webdev'],
			readTime: 3,
			published: true,
		},
	];

	for (const post of posts) {
		const existing = await db.select().from(BlogPosts).where(eq(BlogPosts.slug, post.slug))
		let postId: number
		if (existing.length == 0) {

			await db.insert(BlogPosts).values([{
				title: post.title,
				slug: post.slug,
				date: post.date,
				excerpt: post.excerpt,
				content: post.content,
				readTime: post.readTime,
				published: post.published
			}])

			const inserted = await db.select().from(BlogPosts).where(eq(BlogPosts.slug, post.slug))
			console.log(`Inserted Post : ${inserted}`)
			postId = inserted[0].id
		} else {
			postId = existing[0].id
		}

		for (const tagId of post.tags) {
			const linkExists = await db.select().from(PostTags).where(and(eq(PostTags.postId, postId), eq(PostTags.tagId, tagId)))
			
			if(linkExists.length === 0) {
				await db.insert(PostTags).values([{ postId, tagId }])
			}
		}
	}

	console.log('Seeding complete!');
}


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
			title: 'Test',
			slug: 'test',
			date: new Date(),
			excerpt: 'Test Post!',
			content: `
# Hello World

Welcome to our Astro blog! This post demonstrates Markdown content.

- Built with **Astro**
- Supports Markdown
- Easy to extend
`,
			categoryId: 'tech',
			contentRef: "posts/bookmark.md",
			tags: ['astro', 'md'],
			readTime: 2,
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
				contentRef: post.contentRef,
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


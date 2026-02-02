import { defineDb, defineTable, column } from 'astro:db';

const { text, number, date, boolean } = column;

const BlogPosts = defineTable({
	columns: {
		id: number({ primaryKey: true }),
		title: text(),
		slug: text({ unique: true }),
		date: date(), 
		excerpt: text(),
		content: text(),
		readTime: number(),
		contentRef: text({ default: "" }),
		published: boolean(),
	},
});

const Tags = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		name: column.text({ unique: true }),
		slug: column.text({ unique: true }),
	},
});
const PostTags = defineTable({
	columns: {
		postId: number({
			references: () => BlogPosts.columns.id,
		}),
		tagId: column.text({
			references: () => Tags.columns.id,
		}),
	},
});
// https://astro.build/db/config
export default defineDb({
	tables: {
		BlogPosts,
		Tags,
		PostTags
	}
});

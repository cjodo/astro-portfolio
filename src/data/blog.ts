export interface SimplePost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
  tags: string[];
  readTime: number;
  published: boolean;
}

export const devPosts: SimplePost[] = [
  {
    id: "1",
    title: "Building My First React App",
    slug: "building-my-first-react-app",
    date: "2026-01-15",
    excerpt: "A journey through learning React and building my first real-world application.",
    content: "# Building My First React App\n\nStarting with React...",
    category: "Tutorial",
    tags: ["React", "JavaScript", "Learning"],
    readTime: 5,
    published: true
  },
  {
    id: "2",
    title: "CSS Grid vs Flexbox: When to Use Each",
    slug: "css-grid-vs-flexbox",
    date: "2026-01-20",
    excerpt: "Understanding the differences between CSS Grid and Flexbox.",
    content: "# CSS Grid vs Flexbox\n\nBoth are powerful...",
    category: "CSS",
    tags: ["CSS", "Web Design", "Tutorial"],
    readTime: 7,
    published: true
  }
];

export const getPostBySlug = (posts: SimplePost[], slug: string) => {
	return posts.find((posts) => posts.slug === slug) 
}

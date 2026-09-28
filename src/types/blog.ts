export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: BlogSection[];
  featuredImage: string;
  author: BlogAuthor;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
}

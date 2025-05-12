import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export async function generateStaticParams() {
  const blogDataPath = path.join(process.cwd(), '/data/blog.json');
  const raw = fs.readFileSync(blogDataPath, 'utf8');
  const posts = JSON.parse(raw);

  return posts.map((post: any) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'data', 'blog', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  // Inline markdown processing here
  const result = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = result.toString();

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-white text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-400 text-sm mb-8">
        {new Date(data.date).toLocaleDateString()}
      </p>
      <article
        className="custom-prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}

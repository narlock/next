import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { Metadata } from 'next';

// (optional) Generate <head> metadata dynamically
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me!',
};

export default async function AboutPage() {
  // 1. Define where your markdown lives
  const filePath = path.join(process.cwd(), 'data', 'about.md');

  // 2. Read the markdown file
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // 3. Extract frontmatter + markdown content
  const { content, data } = matter(fileContent);

  // 4. Convert markdown → HTML
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = result.toString();

  // 5. Render it
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {data.title && (
        <h1 className="text-white text-4xl font-bold mb-6">{data.title}</h1>
      )}
      <article
        className="custom-prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}

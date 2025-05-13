import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

// Custom inline remark plugin for [!NOTE]-style admonitions
function remarkAdmonition() {
    return (tree: any) => {
      visit(tree, 'paragraph', (node: any, index: number | undefined, parent: any) => {
        if (
          !node.children ||
          node.children.length === 0 ||
          typeof index !== 'number' ||
          !parent
        ) {
          return;
        }
  
        const textNode = node.children[0];
        if (
          textNode.type === 'text' &&
          /^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i.test(textNode.value)
        ) {
          const match = textNode.value.match(/^\[!(\w+)\]\s*(.*)/);
          if (!match) return;
  
          const type = match[1].toLowerCase();
          const content = match[2];
  
          const icons: Record<string, string> = {
            note: '💡',
            tip: '✨',
            warning: '⚠️',
            important: '❗',
            caution: '🚧',
          };
  
          const labels: Record<string, string> = {
            note: 'Note',
            tip: 'Tip',
            warning: 'Warning',
            important: 'Important',
            caution: 'Caution',
          };
  
          parent.children[index] = {
            type: 'containerDirective',
            name: type,
            children: [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: `admonition-title admonition-title-${type}` },
                children: [
                  {
                    type: 'text',
                    value: `${icons[type] || ''} ${labels[type] || ''}`,
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [{ type: 'text', value: content }],
              },
            ],
            data: {
              hName: 'div',
              hProperties: {
                className: `admonition admonition-${type}`,
              },
            },
          };
        }
      });
    };
  }
  
export async function generateStaticParams() {
  const blogDataPath = path.join(process.cwd(), '/data/blog.json');
  const raw = fs.readFileSync(blogDataPath, 'utf8');
  const posts = JSON.parse(raw);

  return posts.map((post: any) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'data', 'blog', `${slug}.md`);
  const blogDataPath = path.join(process.cwd(), 'data', 'blog.json');

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  const blogDataRaw = fs.readFileSync(blogDataPath, 'utf8');
  const posts = JSON.parse(blogDataRaw);
  const postMeta = posts.find((post: any) => post.slug === slug);

  const result = await remark()
    .use(remarkAdmonition)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = result.toString();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-white text-4xl font-bold mb-2">{data.title}</h1>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <p className="text-gray-400 text-md">
          {new Date(data.date).toLocaleDateString()}
        </p>
        <span className="text-gray-500">•</span>
        {postMeta?.tags?.map((tag: string, idx: number) => (
          <span
            key={idx}
            className="text-xs text-gray-300 bg-gray-800 rounded px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <article
        className="custom-prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  );
}

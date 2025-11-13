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
import { visit } from 'unist-util-visit';

// (optional) Generate <head> metadata dynamically
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me!',
};

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
    .use(remarkAdmonition)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = result.toString();

  // 5. Render it
  return (
    <main className="max-w-md sm:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-white text-4xl font-bold mb-2">{data.title}</h1>
      <div className="w-full overflow-x-auto">
        <article
          className="custom-prose"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  );
}

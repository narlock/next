'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import rawPosts from '../../data/blog.json' assert { type: 'json' };

// ---- Types
type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags?: string[];
};

// ✅ Static tags (only these are filterable)
const TAGS = ['Jinoah', 'AI'] as const;
type Tag = typeof TAGS[number];

const blogPosts = rawPosts as BlogPost[];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'px-3 py-1 rounded-full border text-sm transition-colors ' +
        (active
          ? 'bg-orange-500/20 border-orange-400 text-orange-300'
          : 'bg-transparent border-gray-600 text-gray-300 hover:border-orange-400 hover:text-orange-300')
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Only accept tags from our static list
  const rawTag = searchParams.get('tag') || '';
  const activeTag: Tag | '' = (TAGS as readonly string[]).includes(rawTag)
    ? (rawTag as Tag)
    : '';

  // local copy (mirrors your original pattern)
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  useEffect(() => setPosts(blogPosts), []);

  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags?.includes(activeTag));
  }, [posts, activeTag]);

  const setTag = (tag: Tag | '') => {
    const params = new URLSearchParams(searchParams.toString());
    if (!tag) params.delete('tag');
    else params.set('tag', tag);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <>
      {/* Static tag filter */}
      <div className="flex items-center gap-2 flex-wrap justify-center mb-6">
        <TagPill label="All" active={!activeTag} onClick={() => setTag('')} />
        {(TAGS as readonly string[]).map((t) => (
          <TagPill
            key={t}
            label={t}
            active={activeTag === t}
            onClick={() => setTag(t as Tag)}
          />
        ))}
      </div>

      {activeTag && (
        <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
          <span>
            Showing posts tagged <span className="text-orange-300">#{activeTag}</span>
          </span>
          <button onClick={() => setTag('')} className="underline hover:text-orange-300">
            Clear filter
          </button>
        </div>
      )}

      {/* The list */}
      <ul className="space-y-4">
        {filtered.map((post) => (
          <li key={post.slug} className="space-y-1">
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-300 hover:text-orange-400 transition-colors duration-200 text-base"
            >
              {formatDate(post.date)} • {post.title}
            </Link>

            {/* Show only site tags as linkable badges */}
            <div className="flex gap-2 flex-wrap">
              {post.tags?.map((t) =>
                (TAGS as readonly string[]).includes(t) ? (
                  <button
                    key={t}
                    onClick={() => setTag(t as Tag)}
                    className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300 hover:border-orange-400 hover:text-orange-300 transition-colors"
                    aria-label={`Filter by ${t}`}
                  >
                    #{t}
                  </button>
                ) : (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-gray-900/60 border border-gray-800 text-xs text-gray-500"
                    title="Not a site tag"
                  >
                    #{t}
                  </span>
                )
              )}
            </div>
          </li>
        ))}

        {!filtered.length && (
          <li className="text-gray-400">
            No posts found{activeTag ? ` for “${activeTag}”` : ''}.
          </li>
        )}
      </ul>
    </>
  );
}

export default function BlogPage() {
  return (
    <main className="p-8 min-h-screen max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Blog</h1>
      <hr className="w-full border-t border-gray-600 my-12" />

      {/* Match your Projects page: wrap dynamic content in Suspense */}
      <Suspense fallback={<div className="text-white text-center">Loading blog posts...</div>}>
        <BlogContent />
      </Suspense>
    </main>
  );
}

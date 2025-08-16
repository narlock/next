'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import blogPosts from '../../data/blog.json' assert { type: 'json' };

// ✅ Static tags (order here controls display order)
const TAGS = ['Jinoah', 'AI'];

function useTagFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Only accept tags from the static list
  const raw = searchParams.get('tag') || '';
  const activeTag = TAGS.includes(raw) ? raw : '';

  const setTag = (tag) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!tag) {
      params.delete('tag');
    } else {
      // only set if it's one of our static tags
      if (!TAGS.includes(tag)) return;
      params.set('tag', tag);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return { activeTag, setTag };
}

function TagPill({ label, active, onClick }) {
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

function BlogList({ activeTag }) {
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    setPosts(blogPosts);
  }, []);

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags?.includes(activeTag)) : posts),
    [posts, activeTag]
  );

  if (!filtered.length) {
    return <p className="text-gray-400">No posts found{activeTag ? ` for “${activeTag}”` : ''}.</p>;
  }

  return (
    <ul className="space-y-4">
      {filtered.map((post, index) => {
        const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        });

        return (
          <li key={index} className="space-y-1">
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-300 hover:text-orange-400 transition-colors duration-200 text-base"
            >
              {formattedDate} • {post.title}
            </Link>
            {/* Tag badges: only link the ones that are in our static list */}
            <div className="flex gap-2 flex-wrap">
              {post.tags?.map((t) =>
                TAGS.includes(t) ? (
                  <Link
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300 hover:border-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {t}
                  </Link>
                ) : (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-gray-900/60 border border-gray-800 text-xs text-gray-500"
                    title="Not a site tag"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function BlogPage() {
  const { activeTag, setTag } = useTagFilter();

  return (
    <main className="p-8 min-h-screen max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Blog</h1>

      {/* Static tag filter */}
      <div className="flex items-center gap-2 flex-wrap justify-center mb-6">
        <TagPill label="All" active={!activeTag} onClick={() => setTag('')} />
        {TAGS.map((tag) => (
          <TagPill
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => setTag(tag)}
          />
        ))}
      </div>

      {activeTag && (
        <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
          <span>
            Showing posts tagged <span className="text-orange-300">{activeTag}</span>
          </span>
          <button onClick={() => setTag('')} className="underline hover:text-orange-300">
            Clear filter
          </button>
        </div>
      )}

      <hr className="w-full border-t border-gray-600 my-6" />

      <Suspense fallback={<div className="text-white text-center">Loading blog posts...</div>}>
        <BlogList activeTag={activeTag} />
      </Suspense>
    </main>
  );
}

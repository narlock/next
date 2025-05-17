'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import blogPosts from '../../data/blog.json' assert { type: 'json' };

function BlogList() {
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    setPosts(blogPosts);
  }, []);

  return (
    <ul className="space-y-4">
      {posts.map((post, index) => {
        const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        });

        return (
          <li key={index}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-300 hover:text-orange-400 transition-colors duration-200 text-base"
            >
              {formattedDate} • {post.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function BlogPage() {
  return (
    <main className="p-8 min-h-screen max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Blog</h1>
      {/* Divider */}
      <hr className="w-full border-t border-gray-600 my-12" />
      <Suspense fallback={<div className="text-white text-center">Loading blog posts...</div>}>
        <BlogList />
      </Suspense>
    </main>
  );
}

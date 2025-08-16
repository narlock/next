// next.config.js
/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';

module.exports = {
  // Required for GitHub Pages (pure static files)
  output: 'export',

  // Next/Image can’t optimize on GH Pages
  images: { unoptimized: true },

  // If deploying to https://username.github.io/<repo> use basePath + assetPrefix
  basePath: isGhPages ? `/${repo}` : '',
  assetPrefix: isGhPages ? `/${repo}/` : '',

  // Nice-to-have so /foo/ maps to /foo/index.html
  trailingSlash: true,
};

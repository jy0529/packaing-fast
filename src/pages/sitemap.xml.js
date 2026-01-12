import { getCollection } from 'astro:content';

export async function GET() {
  const site = 'https://packaging-fast.online';
  const posts = await getCollection('blog');
  const postUrls = posts
    .filter(post => !post.data.draft)
    .map(post => `
    <url>
      <loc>${site}/blog/${post.slug}/</loc>
      <lastmod>${post.data.pubDate.toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${site}/blog/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${postUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}

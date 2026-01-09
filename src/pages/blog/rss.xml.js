import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'PackStudio 3D Blog',
    description: 'Insights, tutorials, and news about cosmetic packaging design.',
    site: context.site,
    items: posts
      .filter(post => !post.data.draft)
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}

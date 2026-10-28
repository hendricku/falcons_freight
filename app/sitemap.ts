import type {MetadataRoute} from 'next';
import {site,services,projects,articles} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{
 const paths=['','/about','/services','/industries','/projects','/gallery','/global-network','/blog','/contact','/request-a-quote',...services.map(s=>'/services/'+s.slug),...projects.map(p=>'/projects/'+p.slug),...articles.map(a=>'/post/'+a.slug)];
 return paths.map(path=>({url:site.url+path,lastModified:new Date('2026-10-23T00:00:00Z'),changeFrequency:path===''?'weekly':'monthly',priority:path===''?1:path==='/request-a-quote'?.9:.7}));
}

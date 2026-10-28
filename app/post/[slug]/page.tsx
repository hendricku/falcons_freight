import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Photo from '@/components/Photo';
import Icon from '@/components/Icon';
import {QuoteStrip} from '@/components/Sections';
import {articles} from '@/lib/site';
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const a=articles.find(x=>x.slug===slug);return {title:a?.title||'Article',description:a?.excerpt||'',alternates:{canonical:`/post/${slug}`}}}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=articles.find(x=>x.slug===slug);if(!a)notFound();return <><article className="article-page"><div className="container article-heading"><h1>{a.title}</h1><div className="article-meta"><span>{a.date}</span><span>{a.read}</span><span>A PLUS FALCONS FREIGHT INC.</span></div></div><div className="container"><Photo src={a.image} alt={a.title} className="article-main-photo"/><div className="article-body"><p className="article-standfirst">{a.excerpt}</p>{a.summary.map((p,i)=><p key={i}>{p}</p>)}<div className="original-source"><Icon name="file" size={22}/><div><strong>Original article</strong><p>This page is a newly written editorial summary. The approved original article text should be imported before replacing the live website.</p><span className="micro">SOURCE: ORIGINAL FALCONS ARCHIVE · {a.date.toUpperCase()}</span></div></div><Link className="underlined-link" href="/blog"><Icon name="arrowRight" size={17} style={{transform:'rotate(180deg)'}}/> Back to Insights</Link></div></div></article><QuoteStrip title="Freight questions? Let's talk."/></>}

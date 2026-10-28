import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Photo from '@/components/Photo';
import {PageHero,QuoteStrip,SectionIntro} from '@/components/Sections';
import {projects} from '@/lib/site';
import {ButtonLink} from '@/components/Buttons';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(x=>x.slug===slug);return {title:p?.title||'Project',description:p?.description||'',alternates:{canonical:`/projects/${slug}`}}}
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects.find(x=>x.slug===slug);if(!project)notFound();return <><PageHero eyebrow={project.category} title={project.title+'.'} description={project.description} image={project.image}/><section className="section-pad"><div className="container detail-intro"><div><h2>Connected thinking moves cargo forward.</h2></div><div>{project.details.map(x=><p className="big-body" key={x}>{x}</p>)}<p className="asset-note">Illustrative photography and capability overview. A verified client case study can replace this page following approval.</p><ButtonLink href="/request-a-quote" variant="navy">Talk to Our Team</ButtonLink></div></div></section><section className="section-pad soft-section"><div className="container"><SectionIntro eyebrow="THE BIGGER PICTURE" title="Freight in motion."/><Photo src={project.image} alt={project.title} className="large-landscape"/></div></section><QuoteStrip title="Planning your next movement?"/></>}

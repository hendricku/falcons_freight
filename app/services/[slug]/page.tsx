import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Photo from '@/components/Photo';
import Icon from '@/components/Icon';
import {ButtonLink} from '@/components/Buttons';
import {PageHero,QuoteStrip,SectionIntro} from '@/components/Sections';
import {services} from '@/lib/site';
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const s=services.find(x=>x.slug===slug);return {title:s?.title||'Service',description:s?.description||'Freight services',alternates:{canonical:`/services/${slug}`}};}
export default async function ServiceDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=services.find(x=>x.slug===slug);if(!s)notFound();const others=services.filter(x=>x.slug!==slug).slice(0,3);
return <><PageHero eyebrow={`OUR SERVICES / ${s.eyebrow}`} title={s.title+'.'} description={s.intro} image={s.image}/>
<section className="section-pad"><div className="container detail-intro"><div><h2>{s.intro}</h2></div><div><p className="big-body">{s.description}</p><ButtonLink href={`/request-a-quote?service=${s.slug}`} variant="navy">Get a {s.title} Quote</ButtonLink></div></div></section>
<section className="section-pad soft-section"><div className="container"><SectionIntro eyebrow="02 / CAPABILITIES" title="What we can help you plan."/><div className="feature-layout"><Photo src={s.image} alt={`${s.title} transportation`} className="feature-photo"/><div className="feature-list">{s.features.map((f)=><div className="feature-list-row" key={f}><h3>{f}</h3><Icon name="check" size={22}/></div>)}<p className="feature-note">{s.note}</p></div></div></div></section>
<section className="section-pad"><div className="container"><SectionIntro eyebrow="03 / OUR PROCESS" title="Simple steps. Thoughtful execution." description="A clear framework to guide the discussion, from your initial inquiry to the next shipment milestone."/><div className="steps-grid">{s.process.map((p)=><article className="step-card" key={p.title}><div className="step-rule"/><h3>{p.title}</h3><p>{p.detail}</p></article>)}</div></div></section>
<section className="section-pad soft-section"><div className="container"><SectionIntro eyebrow="04 / EXPLORE MORE" title="More ways to move." link="/services" linkText="All services"/><div className="related-list">{others.map((o)=><Link key={o.slug} href={`/services/${o.slug}`}><strong>{o.title}</strong><Icon name="arrow" size={24}/></Link>)}</div></div></section><QuoteStrip title={`Let's talk ${s.title.toLowerCase()}.`} text="Share your route and cargo details. We'll help you take the next step."/></>}

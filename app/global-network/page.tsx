import type {Metadata} from 'next';
import {PageHero,QuoteStrip,SectionIntro} from '@/components/Sections';
import NetworkMap from '@/components/NetworkMap';
import {photos} from '@/lib/site';
export const metadata:Metadata={title:'Global Freight Network',description:'Explore published network countries and the Manila headquarters location on an interactive map.',alternates:{canonical:'/global-network'}};
export default function GlobalNetwork(){return <>
 <PageHero eyebrow="" title="From Manila to the world." description="Explore locations referenced in the company's published international freight network." image={photos.port}/>
 <section className="section-pad"><div className="container"><div className="network-intro"><div><SectionIntro eyebrow="" title="Connections across continents."/></div><div><p className="big-body">International forwarding relies on informed relationships and thoughtful coordination across borders.</p><p>These locations are sourced from Falcons&apos; published website. Ask the team to verify present-day partners, service coverage and available transport routes.</p></div></div><NetworkMap/></div></section>
 <QuoteStrip title="Connecting cargo across borders?"/>
 </>}

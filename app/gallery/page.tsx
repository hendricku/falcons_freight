import type {Metadata} from 'next';
import {PageHero,QuoteStrip} from '@/components/Sections';
import GalleryGrid from '@/components/GalleryGrid';
import {photos} from '@/lib/site';
export const metadata:Metadata={title:'Logistics Gallery',description:'Explore a photographic gallery of ocean cargo, air freight, road transportation and logistics operations.',alternates:{canonical:'/gallery'}};
export default function Gallery(){return <>
 <PageHero eyebrow="" title="Logistics in perspective." description="Discover the environments, infrastructure and details behind international freight movement." image={photos.containers}/>
 <section className="section-pad gallery-section"><div className="container"><div className="gallery-heading"><h2>Every movement has a story.</h2><p>Explore the world of freight through an editorial photography collection. Documented Falcons project images will be added after company approval.</p></div><GalleryGrid/></div></section>
 <QuoteStrip title="Planning your next shipment?"/>
 </>}

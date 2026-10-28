import type {Metadata,Viewport} from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {site} from '@/lib/site';
import './globals.css';
export const metadata: Metadata = {
 metadataBase:new URL(site.url),
 title:{default:'A Plus Falcons Freight Inc. | Global Freight, Thoughtfully Managed',template:'%s | A Plus Falcons Freight Inc.'},
 description:'A Plus Falcons Freight Inc. is a Manila-based international freight forwarding company. Explore ocean, air, land and customs logistics services.',
 openGraph:{type:'website',siteName:site.name,title:site.name,description:'Global freight, thoughtfully managed.',locale:'en_PH'},
 twitter:{card:'summary_large_image'},
 robots:{index:true,follow:true},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#17294D'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></body></html>;
}

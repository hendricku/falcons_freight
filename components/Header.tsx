'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import Logo from './Logo';
import Icon from './Icon';

const serviceLinks=[
 {title:'Sea Freight',href:'/services/sea-freight',detail:'Ocean freight coordination'},
 {title:'Air Freight',href:'/services/air-freight',detail:'Time-conscious shipments'},
 {title:'Land Transportation',href:'/services/land-transportation',detail:'Domestic cargo movement'},
 {title:'Customs Clearance',href:'/services/customs-clearance',detail:'Cross-border documentation'},
 {title:'Warehousing & Distribution',href:'/services/warehousing',detail:'Handling and cargo storage'},
 {title:'Permits & Licensing',href:'/services/permits-licensing',detail:'Regulatory requirements'},
];
const navigation=[
 {title:'About',href:'/about'},
 {title:'Services',href:'/services',submenu:true},
 {title:'Industries',href:'/industries'},
 {title:'Projects',href:'/projects'},
 {title:'Gallery',href:'/gallery'},
 {title:'Network',href:'/global-network'},
 {title:'Insights',href:'/blog'},
 {title:'Contact',href:'/contact'},
];
export default function Header(){
 const [mobileOpen,setMobileOpen]=useState(false);
 const [megaOpen,setMegaOpen]=useState(false);
 const [mobileServices,setMobileServices]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const navRef=useRef<HTMLDivElement>(null);
 const path=usePathname();
 useEffect(()=>{setMobileOpen(false);setMegaOpen(false);setMobileServices(false)},[path]);
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>12);
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  return()=>window.removeEventListener('scroll',onScroll);
 },[]);
 useEffect(()=>{
  const onKey=(e:KeyboardEvent)=>{
   if(e.key==='Escape') {setMegaOpen(false);setMobileOpen(false);setMobileServices(false)}
  };
  const outside=(e:PointerEvent)=>{
   if(navRef.current&&!navRef.current.contains(e.target as Node))setMegaOpen(false);
  };
  window.addEventListener('keydown',onKey);document.addEventListener('pointerdown',outside);
  return()=>{window.removeEventListener('keydown',onKey);document.removeEventListener('pointerdown',outside)};
 },[]);
 useEffect(()=>{
  document.body.style.overflow=mobileOpen?'hidden':'';
  return()=>{document.body.style.overflow=''};
 },[mobileOpen]);
 const closeMenu=()=>{setMegaOpen(false);setMobileOpen(false)};
 return <header className={`site-header ${scrolled?'scrolled':''}`}>
  <div className="header-top"><div className="container header-top-inner"><span>MANILA, PHILIPPINES <span className="mid-dot">·</span> INTERNATIONAL FREIGHT FORWARDING</span><a href="mailto:inquiry@falconslogistics-ph.com">inquiry@falconslogistics-ph.com <Icon name="arrow" size={13}/></a></div></div>
  <div className="container nav-inner" ref={navRef} onPointerLeave={()=>setMegaOpen(false)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setMegaOpen(false)}}>
   <Logo/>
   <nav className="desktop-nav" aria-label="Main navigation">
    {navigation.map(n=><div key={n.href} className={`nav-item ${n.submenu?'has-mega':''}`} onPointerEnter={()=>setMegaOpen(Boolean(n.submenu))}>
     <Link onClick={closeMenu} onFocus={()=>setMegaOpen(Boolean(n.submenu))} className={`nav-link ${path===n.href||path.startsWith(n.href+'/')?'is-active':''}`} href={n.href}>{n.title}</Link>
     {n.submenu&&<button type="button" className="mega-toggle" aria-label="Toggle Services menu" aria-controls="services-mega-menu" aria-expanded={megaOpen} onClick={()=>setMegaOpen(v=>!v)} onFocus={()=>setMegaOpen(true)}><Icon name="chevron" size={13}/></button>}
    </div>)}
   </nav>
   <div className="nav-cta"><Link className="header-quote" href="/request-a-quote" onFocus={()=>setMegaOpen(false)}>Get a Quote <Icon name="arrow" size={17}/></Link></div>
   <button type="button" aria-label={mobileOpen?'Close navigation':'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="mobile-trigger" onClick={()=>setMobileOpen(v=>!v)}><Icon name={mobileOpen?'close':'menu'} size={26}/></button>
   <div id="services-mega-menu" className={`mega-panel ${megaOpen?'mega-open':''}`} aria-hidden={!megaOpen} onPointerEnter={()=>setMegaOpen(true)}>
    <div className="mega-main"><h2>Freight & logistics services</h2><div className="mega-links">
     {serviceLinks.map(s=><Link key={s.href} href={s.href} tabIndex={megaOpen?0:-1} onClick={closeMenu}><strong>{s.title}</strong><span>{s.detail}</span><Icon name="arrow" size={17}/></Link>)}
    </div></div>
    <div className="mega-aside"><p>LOGISTICS SUPPORT</p><h3>Move your freight with a clearer plan.</h3><span>Tell us where your cargo needs to go and what matters most.</span><Link href="/request-a-quote" tabIndex={megaOpen?0:-1} onClick={closeMenu}>Request a Quote <Icon name="arrow" size={18}/></Link><Link className="mega-overview" href="/services" tabIndex={megaOpen?0:-1} onClick={closeMenu}>Explore all services ↗</Link></div>
   </div>
  </div>
  <div id="mobile-navigation" className={`mobile-panel ${mobileOpen?'mobile-open':''}`} aria-hidden={!mobileOpen}>
   <div className="mobile-panel-scroll">
    {navigation.map(n=><div key={n.href} className="mobile-nav-row"><div className="mobile-nav-group"><Link href={n.href} onClick={closeMenu}>{n.title}</Link>{n.submenu&&<button type="button" aria-label="Toggle services submenu" aria-expanded={mobileServices} onClick={()=>setMobileServices(v=>!v)}><Icon name="chevron" size={18}/></button>}</div>{n.submenu&&mobileServices&&<div className="mobile-submenu">{serviceLinks.map(s=><Link key={s.href} href={s.href} onClick={closeMenu}>{s.title}</Link>)}</div>}</div>)}
    <Link className="btn btn-yellow mobile-quote" href="/request-a-quote" onClick={closeMenu}>Request a Quote <Icon name="arrow" size={18}/></Link>
   </div>
  </div>
 </header>;
}

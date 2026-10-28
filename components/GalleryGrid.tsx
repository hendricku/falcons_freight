'use client';
import {useEffect,useRef,useState} from 'react';
import Icon from './Icon';
import Photo from './Photo';
import {galleryCategories,galleryPhotos,type GalleryCategory} from '@/lib/gallery';
export default function GalleryGrid(){
 const [category,setCategory]=useState<GalleryCategory|'All'>('All');
 const [current,setCurrent]=useState<number|null>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 const dialogRef=useRef<HTMLDivElement>(null);
 const lastFocus=useRef<HTMLElement|null>(null);
 const items=galleryPhotos.filter(p=>category==='All'||category===p.category);
 useEffect(()=>{
  if(current===null)return;
  const priorOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeRef.current?.focus();
  const handle=(event:KeyboardEvent)=>{
   if(event.key==='Escape')setCurrent(null);
   if(event.key==='Tab'){
    const buttons=Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])')||[]);
    const first=buttons[0],last=buttons[buttons.length-1];
    if(first&&last&&event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(first&&last&&!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
   }
   if(event.key==='ArrowRight')setCurrent(v=>v===null?v:(v+1)%items.length);
   if(event.key==='ArrowLeft')setCurrent(v=>v===null?v:(v-1+items.length)%items.length);
  };
  document.addEventListener('keydown',handle);
  return()=>{document.removeEventListener('keydown',handle);document.body.style.overflow=priorOverflow};
 },[current,items.length]);
 const open=(index:number)=>{lastFocus.current=document.activeElement as HTMLElement;setCurrent(index)};
 const close=()=>{setCurrent(null);requestAnimationFrame(()=>lastFocus.current?.focus())};
 const item=current===null?null:items[current];
 return <>
  <div className="gallery-filter" role="group" aria-label="Filter images by category">
   <button type="button" aria-pressed={category==='All'} className={category==='All'?'active':''} onClick={()=>{setCategory('All');setCurrent(null)}}>All photography</button>
   {galleryCategories.map(c=><button type="button" key={c} aria-pressed={category===c} className={category===c?'active':''} onClick={()=>{setCategory(c);setCurrent(null)}}>{c}</button>)}
  </div>
  <div className="gallery-bento">
   {items.map((p,index)=><button className={`gallery-tile ${category==='All'?`gallery-${p.feature||'regular'}`:''}`} key={p.id} type="button" onClick={()=>open(index)} aria-label={`Enlarge photograph: ${p.title}`}>
    <Photo src={p.image} alt={p.title} className="gallery-tile-photo"/>
    <span className="gallery-tile-info"><span>{p.category}</span><strong>{p.title}</strong></span>
    <span className="gallery-tile-icon" aria-hidden="true"><Icon name="arrow" size={21}/></span>
   </button>)}
  </div>
  <p className="asset-note">Illustrative editorial photography for the redesign. These images do not document verified Falcons projects or employees. Replace with approved company-owned or licensed photography before launch.</p>
  {item&&<div className="gallery-lightbox" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)close()}}>
   <div className="gallery-lightbox-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Gallery photograph: ${item.title}`}>
    <button ref={closeRef} type="button" className="gallery-lightbox-close" onClick={close} aria-label="Close enlarged photograph"><Icon name="close" size={25}/></button>
    <Photo src={item.image} alt={item.title} className="gallery-lightbox-image"/>
    <div className="gallery-lightbox-bottom"><button type="button" aria-label="Previous photograph" onClick={()=>setCurrent(v=>v===null?v:(v-1+items.length)%items.length)}>← Previous</button><span>{item.title} · {current === null ? 0 : current + 1} of {items.length}</span><button type="button" aria-label="Next photograph" onClick={()=>setCurrent(v=>v===null?v:(v+1)%items.length)}>Next →</button></div>
   </div>
  </div>}
 </>;
}

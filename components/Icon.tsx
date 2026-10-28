import type { CSSProperties, ReactNode } from 'react';
export type IconName = 'arrow'|'arrowRight'|'arrowUp'|'menu'|'close'|'chevron'|'ship'|'plane'|'truck'|'file'|'boxes'|'shield'|'globe'|'location'|'mail'|'phone'|'check'|'clock'|'compass'|'layers'|'plus'|'external'|'send';
export default function Icon({name,size=20,className,style}:{name:IconName,size?:number,className?:string,style?:CSSProperties}) {
 const paths: Record<IconName,ReactNode> = {
  arrow:<><path d="M4 16 16 4M6 4h10v10"/></>,
  arrowRight:<><path d="M4 12h16m-7-7 7 7-7 7"/></>,
  arrowUp:<><path d="M12 20V4m-7 7 7-7 7 7"/></>,
  menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close:<><path d="M5 5l14 14M19 5 5 19"/></>,
  chevron:<><path d="m6 9 6 6 6-6"/></>,
  ship:<><path d="M12 3v17M5 9l7-6 7 6M3 16l9-3 9 3-3 5H6z"/><path d="M2 22c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/></>,
  plane:<><path d="M22 2 2 11l8 3 3 8 9-20zM10 14l5-5"/></>,
  truck:<><path d="M3 6h12v11H3zM15 10h4l3 4v3h-7z"/><circle cx="7.5" cy="18" r="2"/><circle cx="18.5" cy="18" r="2"/></>,
  file:<><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h6"/></>,
  boxes:<><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="8" y="13" width="8" height="8"/></>,
  shield:<><path d="m12 2 9 4v6c0 5-3 8-9 10-6-2-9-5-9-10V6z"/><path d="m8 12 3 3 5-6"/></>,
  globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-4 4-4 14 0 18M12 3c4 4 4 14 0 18"/></>,
  location:<><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  mail:<><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/></>,
  phone:<><path d="M7 3 4 6c-.9 1 0 5 4 9s8 5 9 4l3-3-5-4-2 3a18 18 0 0 1-4-4l3-2z"/></>,
  check:<><path d="m4 12 5 5L20 6"/></>,
  clock:<><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
  compass:<><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-4 1 2-5z"/></>,
  layers:<><path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
  plus:<><path d="M12 5v14M5 12h14"/></>,
  external:<><path d="M13 4h7v7M20 4l-9 9M20 14v6H4V4h6"/></>,
  send:<><path d="m22 2-7 20-4-9-9-4 20-7zM11 13l11-11"/></>
 };
 return <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

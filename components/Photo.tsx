import type { CSSProperties, ReactNode } from 'react';
function fallbackFor(src:string){
 if(src.includes('1436491865332'))return '/visuals/air.svg';
 if(src.includes('1519003722824'))return '/visuals/road.svg';
 if(src.includes('1586528116311'))return '/visuals/warehouse.svg';
 if(src.includes('1556761175')||src.includes('1521737711867'))return '/visuals/warehouse.svg';
 return '/visuals/port.svg';
}
export default function Photo({src,alt,className='',children,style}:{src:string,alt:string,className?:string,children?:ReactNode,style?:CSSProperties}) {
 return <div className={`photo ${className}`} role="img" aria-label={alt} style={{...style,backgroundImage:`linear-gradient(145deg, rgba(17,36,65,.05), rgba(17,36,65,.28)), url("${src}"), url("${fallbackFor(src)}")`}}>{children}</div>;
}

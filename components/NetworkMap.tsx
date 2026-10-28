'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {manila,networkLocations,networkRegions,type NetworkRegion} from '@/lib/network-locations';

type LeafletMarker = {addTo:(map:LeafletMap)=>LeafletMarker; bindPopup:(html:string)=>LeafletMarker;openPopup:()=>void};
type LeafletMap = {remove:()=>void;setView:(point:[number,number],zoom:number)=>LeafletMap;flyTo:(point:[number,number],zoom:number)=>void;invalidateSize:()=>void};
type LeafletFactory = {
  map:(element:HTMLElement,options:Record<string,unknown>)=>LeafletMap;
  tileLayer:(url:string,options:Record<string,unknown>)=>{addTo:(map:LeafletMap)=>unknown};
  circleMarker:(point:[number,number],options:Record<string,unknown>)=>LeafletMarker;
};
declare global {interface Window {L?:LeafletFactory}}

let leafletLoad:Promise<LeafletFactory>|undefined;
function loadLeaflet():Promise<LeafletFactory>{
 if(typeof window==='undefined') return Promise.reject(new Error('Client only'));
 if(window.L) return Promise.resolve(window.L);
 if(leafletLoad) return leafletLoad;
 leafletLoad = new Promise<LeafletFactory>((resolve,reject)=>{
  const cssId='falcons-leaflet-css';
  if(!document.getElementById(cssId)){
   const link=document.createElement('link');link.id=cssId;link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';link.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoTM2AFNufom9Q=';link.crossOrigin='anonymous';document.head.appendChild(link);
  }
  const script=document.createElement('script');
  script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.async=true;script.crossOrigin='anonymous';script.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
  script.onload=()=>window.L?resolve(window.L):reject(new Error('Leaflet did not initialize'));
  script.onerror=()=>reject(new Error('Leaflet unavailable'));
  document.head.appendChild(script);
 }).catch((error:unknown)=>{leafletLoad=undefined;throw error});
 return leafletLoad;
}

export default function NetworkMap({compact=false}:{compact?:boolean}){
 const containerRef=useRef<HTMLDivElement>(null);
 const mapRef=useRef<LeafletMap|null>(null);
 const markersRef=useRef<Map<string,LeafletMarker>>(new Map());
 const [region,setRegion]=useState<NetworkRegion|'All'>('All');
 const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading');
 useEffect(()=>{
  let active=true;
  const el=containerRef.current;
  if(!el)return;
  setStatus('loading');
  loadLeaflet().then(L=>{
   if(!active||!el.isConnected)return;
   const map=L.map(el,{scrollWheelZoom:false,zoomControl:true,worldCopyJump:true,attributionControl:true});
   mapRef.current=map;
   map.setView([22,20],compact?2:2);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',maxZoom:14,
   }).addTo(map);
   const home=L.circleMarker([manila.lat,manila.lng],{radius:11,color:'#13294a',weight:3,fillColor:'#f4c629',fillOpacity:1});
   home.addTo(map).bindPopup('<strong>Manila, Philippines</strong><br/>Company headquarters location');
   markersRef.current.set('Manila',home);
   networkLocations.filter(loc=>compact||region==='All'||loc.region===region).forEach(loc=>{
    const marker=L.circleMarker([loc.lat,loc.lng],{radius:6,color:'#fff',weight:2,fillColor:'#24466f',fillOpacity:1});
    marker.addTo(map).bindPopup(`<strong>${loc.name}</strong><br/>Published network country — representative pin, not an office location`);
    markersRef.current.set(loc.name,marker);
   });
   requestAnimationFrame(()=>{if(active){map.invalidateSize();setStatus('ready')}});
  }).catch(()=>{if(active)setStatus('error')});
  return()=>{active=false;mapRef.current?.remove();mapRef.current=null;markersRef.current.clear()};
 },[compact,region]);
 const visible=networkLocations.filter(loc=>region==='All'||loc.region===region);
 const selectLocation=(name:string,lat:number,lng:number)=>{
   mapRef.current?.flyTo([lat,lng],5);
   markersRef.current.get(name)?.openPopup();
 };
 return <div className={`interactive-network ${compact?'interactive-network-compact':''}`}>
  {!compact&&<div className="network-controls" aria-label="Filter network locations">
   <button type="button" className={region==='All'?'selected':''} aria-pressed={region==='All'} onClick={()=>setRegion('All')}>All regions</button>
   {networkRegions.map(r=><button type="button" key={r} className={region===r?'selected':''} aria-pressed={region===r} onClick={()=>setRegion(r)}>{r}</button>)}
  </div>}
  <div className="leaflet-map-shell">
   <div ref={containerRef} className="leaflet-map-canvas" role="application" aria-label="Interactive map of published network countries, with Manila as company headquarters"/>
   {status==='loading'&&<div className="map-status" role="status">Loading interactive map…</div>}
   {status==='error'&&<div className="map-status" role="status">The map requires an internet connection. The published locations are listed below.</div>}
  </div>
  {compact?<div className="network-map-support"><span>Manila headquarters · Published international network countries</span><Link href="/global-network">Explore all locations →</Link></div>:
   <><p className="network-disclaimer">Pins identify countries using representative geographic coordinates. They do not indicate a Falcons office, verified partner address or confirmed route. Map data © OpenStreetMap contributors.</p>
   <div className="network-location-list" aria-label="Published network countries">
    <button type="button" className="network-location-btn home-location-btn" onClick={()=>selectLocation('Manila',manila.lat,manila.lng)}>Manila, Philippines <span>Headquarters</span></button>
    {visible.map(loc=><button type="button" key={loc.name} className="network-location-btn" onClick={()=>selectLocation(loc.name,loc.lat,loc.lng)}>{loc.name}<span>View pin ↗</span></button>)}
   </div></>}
 </div>;
}

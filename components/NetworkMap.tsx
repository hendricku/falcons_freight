'use client';

import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {manila,networkLocations,networkRegions,type NetworkRegion} from '@/lib/network-locations';
import type * as Leaflet from 'leaflet';

type LeafletModule=typeof import('leaflet');

// Load Leaflet only in the browser and bundle it with the site rather than relying on a script CDN.
let leafletLoad:Promise<LeafletModule>|undefined;
function loadLeaflet(){
 leafletLoad??=import('leaflet');
 return leafletLoad;
}

export default function NetworkMap({compact=false}:{compact?:boolean}){
 const containerRef=useRef<HTMLDivElement>(null);
 const mapRef=useRef<Leaflet.Map|null>(null);
 const markersRef=useRef<Map<string,Leaflet.CircleMarker>>(new Map());
 const [region,setRegion]=useState<NetworkRegion|'All'>('All');
 const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading');

 useEffect(()=>{
  let active=true;
  let resizeObserver:ResizeObserver|undefined;
  let resizeFrame:number|undefined;
  const el=containerRef.current;
  if(!el)return;
  setStatus('loading');

  loadLeaflet().then(L=>{
   if(!active||!el.isConnected)return;
   const map=L.map(el,{scrollWheelZoom:false,zoomControl:true,worldCopyJump:true,attributionControl:true,preferCanvas:true});
   mapRef.current=map;
   map.setView([22,20],2);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
    maxZoom:14,
    minZoom:2,
    crossOrigin:true,
   }).addTo(map);

   const home=L.circleMarker([manila.lat,manila.lng],{radius:11,color:'#13294a',weight:3,fillColor:'#f4c629',fillOpacity:1});
   home.addTo(map).bindPopup('<strong>Manila, Philippines</strong><br/>Company headquarters location');
   markersRef.current.set('Manila',home);
   networkLocations.filter(loc=>compact||region==='All'||loc.region===region).forEach(loc=>{
    const marker=L.circleMarker([loc.lat,loc.lng],{radius:6,color:'#fff',weight:2,fillColor:'#24466f',fillOpacity:1});
    marker.addTo(map).bindPopup(`<strong>${loc.name}</strong><br/>Published network country &mdash; representative pin, not an office location`);
    markersRef.current.set(loc.name,marker);
   });

   // The homepage map is inside a responsive grid. Keep tiles aligned whenever that grid changes size.
   const refreshSize=()=>{
    if(resizeFrame)cancelAnimationFrame(resizeFrame);
    resizeFrame=requestAnimationFrame(()=>{
     if(active&&el.isConnected)map.invalidateSize({pan:false,debounceMoveend:true});
    });
   };
   resizeObserver=new ResizeObserver(refreshSize);
   resizeObserver.observe(el);
   refreshSize();
   setStatus('ready');
  }).catch(()=>{if(active)setStatus('error')});

  return()=>{
   active=false;
   if(resizeFrame)cancelAnimationFrame(resizeFrame);
   resizeObserver?.disconnect();
   mapRef.current?.remove();
   mapRef.current=null;
   markersRef.current.clear();
  };
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
   {status==='loading'&&<div className="map-status" role="status">Loading interactive map&hellip;</div>}
   {status==='error'&&<div className="map-status" role="status">The map could not load. The published locations are listed below.</div>}
  </div>
  {compact?<div className="network-map-support"><span>Manila headquarters &middot; Published international network countries</span><Link href="/global-network">Explore all locations &rarr;</Link></div>:
   <><p className="network-disclaimer">Pins identify countries using representative geographic coordinates. They do not indicate a Falcons office, verified partner address or confirmed route. Map data &copy; OpenStreetMap contributors.</p>
   <div className="network-location-list" aria-label="Published network countries">
    <button type="button" className="network-location-btn home-location-btn" onClick={()=>selectLocation('Manila',manila.lat,manila.lng)}>Manila, Philippines <span>Headquarters</span></button>
    {visible.map(loc=><button type="button" key={loc.name} className="network-location-btn" onClick={()=>selectLocation(loc.name,loc.lat,loc.lng)}>{loc.name}<span>View pin &nearr;</span></button>)}
   </div></>}
 </div>;
}

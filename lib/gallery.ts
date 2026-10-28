import {photos} from './site';
export type GalleryCategory='Ocean & Port'|'Air & Road'|'Warehousing'|'People & Trade';
export type GalleryPhoto={id:string;title:string;category:GalleryCategory;image:string;feature?:'wide'|'tall'|'large'};
/** Editorial image placeholders. Must be replaced with licensed / Falcons-approved imagery. */
export const galleryPhotos:GalleryPhoto[]=[
 {id:'ocean-terminal',title:'Port terminal operations',category:'Ocean & Port',image:photos.port,feature:'large'},
 {id:'road-transport',title:'Road freight movement',category:'Air & Road',image:photos.truck},
 {id:'freight-aircraft',title:'Air cargo and global connections',category:'Air & Road',image:photos.air},
 {id:'cargo-storage',title:'Warehousing and cargo care',category:'Warehousing',image:photos.warehouse,feature:'tall'},
 {id:'container-trade',title:'International container trade',category:'Ocean & Port',image:photos.containers},
 {id:'cargo-shipping',title:'Sea freight infrastructure',category:'Ocean & Port',image:photos.ship,feature:'wide'},
 {id:'coordination',title:'People behind cargo coordination',category:'People & Trade',image:photos.people},
 {id:'planning',title:'Trade and logistics planning',category:'People & Trade',image:photos.document},
 {id:'global-trade',title:'International trade connections',category:'Ocean & Port',image:photos.skyline},
 {id:'port-arrival',title:'Containers on the move',category:'Ocean & Port',image:photos.hero,feature:'wide'},
];
export const galleryCategories:GalleryCategory[]=['Ocean & Port','Air & Road','Warehousing','People & Trade'];

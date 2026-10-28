/** Countries listed in Falcons' published network. Pins are representative capital/central
 * coordinates ONLY and do not assert an office, agent or confirmed transport route. */
export type NetworkRegion = 'East Asia' | 'Southeast & South Asia / Oceania' | 'Europe' | 'North America';
export type NetworkLocation = { name:string; region:NetworkRegion; lat:number; lng:number };
export const networkLocations:NetworkLocation[] = [
  {name:'China',region:'East Asia',lat:39.9042,lng:116.4074},
  {name:'Hong Kong',region:'East Asia',lat:22.3193,lng:114.1694},
  {name:'South Korea',region:'East Asia',lat:37.5665,lng:126.9780},
  {name:'Taiwan',region:'East Asia',lat:25.0330,lng:121.5654},
  {name:'Japan',region:'East Asia',lat:35.6762,lng:139.6503},
  {name:'Thailand',region:'Southeast & South Asia / Oceania',lat:13.7563,lng:100.5018},
  {name:'Singapore',region:'Southeast & South Asia / Oceania',lat:1.3521,lng:103.8198},
  {name:'Australia',region:'Southeast & South Asia / Oceania',lat:-35.2809,lng:149.1300},
  {name:'Malaysia',region:'Southeast & South Asia / Oceania',lat:3.1390,lng:101.6869},
  {name:'India',region:'Southeast & South Asia / Oceania',lat:28.6139,lng:77.2090},
  {name:'Vietnam',region:'Southeast & South Asia / Oceania',lat:21.0278,lng:105.8342},
  {name:'Italy',region:'Europe',lat:41.9028,lng:12.4964},
  {name:'Turkey',region:'Europe',lat:39.9334,lng:32.8597},
  {name:'France',region:'Europe',lat:48.8566,lng:2.3522},
  {name:'Sweden',region:'Europe',lat:59.3293,lng:18.0686},
  {name:'Germany',region:'Europe',lat:52.5200,lng:13.4050},
  {name:'Spain',region:'Europe',lat:40.4168,lng:-3.7038},
  {name:'Netherlands',region:'Europe',lat:52.3676,lng:4.9041},
  {name:'Canada',region:'North America',lat:45.4215,lng:-75.6972},
  {name:'United States of America',region:'North America',lat:38.9072,lng:-77.0369},
];
export const networkRegions:NetworkRegion[] = ['East Asia','Southeast & South Asia / Oceania','Europe','North America'];
export const manila = {name:'Manila, Philippines',lat:14.5995,lng:120.9842};

import {NextRequest,NextResponse} from 'next/server';
import {site} from '@/lib/site';
export const runtime='nodejs';
const requests=new Map<string,{count:number,reset:number}>();
const MAX_BYTES=12000;
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function safe(s:unknown,len:number=3000){return typeof s==='string'?s.trim().slice(0,len):''}
function escapeHtml(str:string){return str.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');
 const hostname=request.headers.get('x-forwarded-host')||request.headers.get('host');
 if(origin&&hostname){try{if(new URL(origin).host!==hostname)return NextResponse.json({error:'Invalid request origin.'},{status:403})}catch{return NextResponse.json({error:'Invalid request origin.'},{status:403})}}
 if(Number(request.headers.get('content-length')||0)>MAX_BYTES)return NextResponse.json({error:'Request too large.'},{status:413});
 const ip=(request.headers.get('x-forwarded-for')||'').split(',')[0].trim()||'unknown';
 const now=Date.now();
 // Lightweight defense in depth only; use edge/WAF or shared rate limits in production.
 const existing=requests.get(ip);
 if(existing&&now<existing.reset&&existing.count>=5)return NextResponse.json({error:'Too many requests. Please try again later.'},{status:429});
 requests.set(ip,!existing||now>existing.reset?{count:1,reset:now+60*60*1000}:{...existing,count:existing.count+1});
 // Bound Map growth for long-lived Node processes.
 if(requests.size>3000){for(const [key,val] of requests){if(val.reset<now)requests.delete(key)}}
 let body:Record<string,unknown>;
 try{const raw=await request.text();if(raw.length>MAX_BYTES)return NextResponse.json({error:'Request too large.'},{status:413});body=JSON.parse(raw)}catch{return NextResponse.json({error:'Invalid form data.'},{status:400})}
 if(!body||typeof body!=='object'||Array.isArray(body))return NextResponse.json({error:'Invalid form data.'},{status:400});
 if(safe(body.website))return NextResponse.json({ok:true}); // Honeypot silently drops bots.
 const mode=safe(body.mode,12);
 if(mode!=='contact'&&mode!=='quote')return NextResponse.json({error:'Invalid inquiry type.'},{status:400});
 if(body.consent!=='yes')return NextResponse.json({error:'Please accept the privacy notice.'},{status:400});
 const name=safe(body.name,100),email=safe(body.email,160),notes=safe(body.notes),originLocation=safe(body.origin,140),destination=safe(body.destination,140);
 if(name.length<2||!emailPattern.test(email)|| (mode==='quote'&&(!originLocation||!destination)) || (mode==='contact'&&notes.length<4))return NextResponse.json({error:'Please complete all required fields with valid details.'},{status:400});
 const allowedServices=['sea-freight','air-freight','land-transportation','customs-clearance','warehousing','permits-licensing','unsure'];
 if(mode==='quote'&&!allowedServices.includes(safe(body.service,50)))return NextResponse.json({error:'Please choose a valid service.'},{status:400});
 const fields:Record<string,string>={
  'Inquiry type':mode==='quote'?'Freight Quote':'General Contact',
  'Full name':name,'Email':email,'Company':safe(body.company,140),'Phone':safe(body.phone,35),
  'Service':safe(body.service,80),'Movement':safe(body.movement,40),'Origin':originLocation,'Destination':destination,
  'Cargo category':safe(body.cargoType,100),'Date':safe(body.preferredDate,30),'Weight (kg)':safe(body.weightKg,40),
  'Dimensions / Volume':safe(body.dimensions,130),'Container':safe(body.container,30),'Vehicle needs':safe(body.vehicleNeeds,160),
  'Contact topic':safe(body.inquiryType,40),'Message':notes
 };
 const apiKey=process.env.RESEND_API_KEY,from=process.env.INQUIRY_FROM_EMAIL,to=process.env.INQUIRY_TO_EMAIL||site.email;
 if(!apiKey||!from)return NextResponse.json({error:'Online inquiries are not enabled yet. Please email our team directly.'},{status:503});
 const html=`<div style="font-family:Arial,sans-serif;color:#17294D;max-width:700px;margin:auto"><h1>New Falcons website inquiry</h1><p>A visitor has submitted the ${mode==='quote'?'freight quotation':'contact'} form.</p><table cellpadding="9" cellspacing="0" style="border-collapse:collapse;width:100%">${Object.entries(fields).filter(([,v])=>v).map(([k,v])=>`<tr><th align="left" style="border-bottom:1px solid #ddd;background:#f6f7f9">${escapeHtml(k)}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join('')}</table><p style="color:#888">Sent from ${escapeHtml(site.name)} website.</p></div>`;
 try{
  const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,subject:`${mode==='quote'?'Freight Quote Request':'Website Contact'} — ${name}`,html,reply_to:email}),signal:AbortSignal.timeout(10000)});
  if(!result.ok){console.error('Resend API returned',result.status);return NextResponse.json({error:'Unable to deliver your message right now. Please email us directly.'},{status:502})}
  return NextResponse.json({ok:true});
 }catch(err){console.error('Inquiry delivery error',err);return NextResponse.json({error:'Email service temporarily unavailable. Please contact our team directly.'},{status:502})}
}

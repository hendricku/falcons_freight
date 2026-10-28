'use client';
import {useState,useEffect, type FormEvent} from 'react';
import Link from 'next/link';
import Icon from './Icon';
import {services} from '@/lib/site';
const shipmentTypes = ['General cargo','Industrial equipment','Consumer goods','Temperature-sensitive goods','Other / Not sure'];
export default function InquiryForm({mode='quote'}:{mode?:'quote'|'contact'}){
 const [kind,setKind]=useState('sea-freight');
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [message,setMessage]=useState('');
 const isQuote=mode==='quote';
 useEffect(()=>{if(mode==='quote'){const desired=new URLSearchParams(window.location.search).get('service');if(desired&&services.some(s=>s.slug===desired))setKind(desired)}},[mode]);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(status==='sending')return;
  const form=e.currentTarget;
  const data=new FormData(form);
  const fields=Object.fromEntries(data.entries());
  setStatus('sending');setMessage('');
  try{
   const controller=new AbortController();
   const timeout=setTimeout(()=>controller.abort(),15000);
   let response:Response;
   try { response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,mode}),signal:controller.signal}); }
   finally{clearTimeout(timeout)}
   const payload=await response.json();
   if(!response.ok)throw new Error(payload.error||'Unable to send at this time.');
   form.reset();setKind('sea-freight');setStatus('success');setMessage('Your inquiry has been sent. Our team will get back to you as soon as possible.');
  }catch(err){setStatus('error');setMessage(err instanceof Error?err.message:'Something went wrong. Please try again or email us directly.');}
 }
 if(status==='success')return <div className="form-success" role="status"><span className="success-icon"><Icon name="check" size={32}/></span><span className="micro">MESSAGE RECEIVED</span><h2>Thank you for reaching out.</h2><p>{message}</p><button type="button" className="btn btn-navy" onClick={()=>{setStatus('idle');setMessage('')}}>Start another inquiry <Icon name="arrow" size={17}/></button></div>;
 return <form className="inquiry-form" onSubmit={submit}>
  <div className="form-header"><span className="micro">{isQuote?'FREIGHT QUOTATION':'DIRECT CONTACT'}</span><h2>{isQuote?'Tell us about your shipment.':'How can we help?'}</h2><p>{isQuote?'Share what you know. You do not need all the technical details to begin.':'Use this form for general inquiries, questions or partnership discussions.'}</p></div>
  {isQuote&&<><div className="form-section-title"><span>01</span><h3>Shipment details</h3></div><div className="field-row"><label className="field"><span>Service required <b>*</b></span><select name="service" value={kind} onChange={e=>setKind(e.target.value)} required>{services.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}<option value="unsure">Not sure yet</option></select></label><label className="field"><span>Movement type <b>*</b></span><select name="movement" defaultValue="international" required><option value="international">International</option><option value="domestic">Domestic</option><option value="not-sure">Not sure</option></select></label></div><div className="field-row"><label className="field"><span>Origin <b>*</b></span><input name="origin" placeholder="City, country or port" autoComplete="off" maxLength={140} required/></label><label className="field"><span>Destination <b>*</b></span><input name="destination" placeholder="City, country or port" autoComplete="off" maxLength={140} required/></label></div><div className="field-row"><label className="field"><span>Cargo type</span><select name="cargoType" defaultValue=""><option value="">Select cargo type (optional)</option>{shipmentTypes.map(t=><option key={t}>{t}</option>)}</select></label><label className="field"><span>Preferred shipment date</span><input name="preferredDate" type="date"/></label></div><div className="field-row"><label className="field"><span>Estimated gross weight (kg)</span><input type="number" name="weightKg" min="0" step="0.01" placeholder="e.g. 1,200"/></label><label className="field"><span>Dimensions or volume</span><input name="dimensions" placeholder="e.g. 2 CBM or 120 × 80 × 60 cm" maxLength={130}/></label></div>{kind==='sea-freight'&&<label className="field"><span>Container preference</span><select name="container" defaultValue="unsure"><option value="unsure">Not sure / Need guidance</option><option value="FCL">Full Container Load (FCL)</option><option value="LCL">Less than Container Load (LCL)</option></select></label>}{kind==='land-transportation'&&<label className="field"><span>Delivery access or vehicle requirements</span><input name="vehicleNeeds" placeholder="Optional details" maxLength={160}/></label>}</>}
  <div className="form-section-title"><span>{isQuote?'02':'01'}</span><h3>Your contact details</h3></div><div className="field-row"><label className="field"><span>Full name <b>*</b></span><input name="name" autoComplete="name" maxLength={100} placeholder="Your full name" required/></label><label className="field"><span>Business email <b>*</b></span><input name="email" type="email" autoComplete="email" maxLength={160} placeholder="name@company.com" required/></label></div><div className="field-row"><label className="field"><span>Company / Organization</span><input name="company" autoComplete="organization" maxLength={140} placeholder="Company name"/></label><label className="field"><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" maxLength={35} placeholder="+63"/></label></div>{!isQuote&&<label className="field"><span>Inquiry type <b>*</b></span><select name="inquiryType" required defaultValue="general"><option value="general">General inquiry</option><option value="partnership">Partnership</option><option value="services">Service information</option><option value="other">Other</option></select></label>}
  <label className="field"><span>{isQuote?'Additional shipment information':'Your message'} {!isQuote&&<b>*</b>}</span><textarea name="notes" rows={5} maxLength={3000} placeholder={isQuote?'Tell us about handling requirements, shipment schedule or anything that may help us prepare your quote.':'How can we help you?'} required={!isQuote}/></label>
  <div className="honeypot" aria-hidden="true"><label>Website <input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  <label className="consent"><input type="checkbox" name="consent" value="yes" required/><span>I agree to the processing of my information for this inquiry, as described in the <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>. <b>*</b></span></label>
  <div className="form-submit-row"><button type="submit" className="btn btn-yellow" disabled={status==='sending'}>{status==='sending'?'Sending...':isQuote?'Submit Quote Request':'Send Message'}<Icon name="arrow" size={18}/></button><p>Prefer email? <a href="mailto:inquiry@falconslogistics-ph.com">Contact our team directly</a>.</p></div>
  {status==='error'&&<p className="form-error" role="alert">{message} You can also email <a href="mailto:inquiry@falconslogistics-ph.com">inquiry@falconslogistics-ph.com</a>.</p>}
 </form>;
}

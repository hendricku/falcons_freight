const references=[
 {mark:'WCA',name:'China Global'},
 {mark:'DTI',name:'Fair Trade Enforcement Bureau'},
 {mark:'BOC',name:'Bureau of Customs Philippines'},
 {mark:'POC',name:'Port of Cebu'},
 {mark:'PEZA',name:'Philippine Economic Zone Authority'},
];

// Text-forward presentation until approved third-party logo files are supplied.
export default function AccreditationStrip(){
 return <aside className="accreditation-strip" aria-label="Industry and regulatory references">
  <div className="container accreditation-strip-inner">
   <span className="accreditation-kicker">Industry &amp; regulatory references</span>
   <div className="accreditation-references">
    {references.map(reference=><div className="accreditation-reference" key={reference.mark}>
     <strong>{reference.mark}</strong><span>{reference.name}</span>
    </div>)}
   </div>
  </div>
 </aside>;
}

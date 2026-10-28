import Link from 'next/link';
export default function Logo({inverse=false}:{inverse?:boolean}){
 return <Link href="/" className={`logo-lockup ${inverse?'inverse':''}`} aria-label="A Plus Falcons Freight Inc., homepage">
 <svg className="falcon-mark" viewBox="0 0 70 65" aria-hidden="true" fill="none">
  <path fill="#182E57" d="M5 4 43 36 36 27 54 25 67 32 52 36 27 61 35 43 20 49 13 42Z"/>
  <path fill="#F6C51B" d="M29 2 33 23 47 33 43 18Z"/>
 </svg>
 <span className="brand-words"><strong>A PLUS FALCONS</strong><small>FREIGHT INC.</small></span></Link>;
}

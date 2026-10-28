import Link from 'next/link';
import Icon from '@/components/Icon';
export default function NotFound(){return <section className="not-found"><div className="container"><span>ERROR / 404</span><h1>Looks like this route<br/>has changed.</h1><p>The page you&apos;re looking for may have moved. Let&apos;s get you back on course.</p><Link className="btn btn-yellow" href="/">Back to Home <Icon name="arrow" size={19}/></Link></div></section>}

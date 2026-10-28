import Link from 'next/link';
import Icon from './Icon';
export function ButtonLink({href,children,variant='yellow',className=''}:{href:string,children:React.ReactNode,variant?:'yellow'|'navy'|'outline'|'white'|'text',className?:string}) {
 return <Link href={href} className={`btn btn-${variant} ${className}`}>{children}<Icon name="arrow" size={17}/></Link>;
}

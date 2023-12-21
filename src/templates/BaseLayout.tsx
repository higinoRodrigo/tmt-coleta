import { ReactNode } from 'react'
import { MenuBottom } from './MenuBottom'
import Head from 'next/head'
import { PiKeyReturn } from "react-icons/pi";
import Image from 'next/image';
import sloganTmt from "/public/images/logoTmt2.png";
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BaseLayout = ({children, titlePage}: { children: ReactNode, titlePage: string }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{titlePage ? `${titlePage} - TMT` : 'TMT'}</title>
      </Head>

      <div className={`p-3 pb-6`}>
        <div className={`flex items-start justify-between border-b mb-5 ${router.pathname !== "/" ? "" : "hidden" }`}>
          <Link href="/">
            <div>
              <PiKeyReturn className={`w-8 h-8`}/>
              <span className='text-sm'>Voltar</span>
            </div>
          </Link>

          <div>
            <Image
              className="w-36 -mt-2"
              src={sloganTmt}
              alt="logo"
              priority
            />
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

import {FC} from 'react'
import Head from "next/head";


interface ShopLayoutProps{
  title: string;
  pageDescription : string;
  imageFullUrl?: string;
  children: React.ReactNode
}



export const ShopLayout:FC<ShopLayoutProps> = ({children,pageDescription,title,imageFullUrl}) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription}/> 
        <meta name="ogi:title" content={title}/>
        <meta name="ogi:description" content={pageDescription}/>
        {
          imageFullUrl && <meta name="ogi:image" content={imageFullUrl}/>  
        }
 

      </Head>
      <nav>
        {/* hacer el navbar */}
      </nav>
      {/**  hacer el sidebar */}
      <main style={{
        margin:'80px auto',
        maxWidth:'1440px',
        padding:'0px 30px'
      }}>
        {children}
      </main>

      <footer>

      {/** hacer el footer */}
      </footer>


    </>
  )
}

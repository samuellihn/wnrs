import '@styles/global.sass'
import Head from 'next/head'
import { useEffect } from 'react'
import { ThemeProvider } from "@src/context/ThemeContext"
import metadata from "@util/metadata.json"

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Configure height
    const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
    window.addEventListener('resize', appHeight)
    appHeight()
    return () => window.removeEventListener('resize', appHeight)
  }, []);

  return (
    <>

      <Head>
        <title>{metadata.title}</title>
        <meta charSet="utf-8" />
        {Object.entries(metadata.link).map(([type, href]) => 
          <link key={type} rel={type} href={href}/>)}
        {Object.entries(metadata.document).map(([type, content]) => 
          <meta key={type} name={type} content={content}/>)}
        {Object.entries(metadata.og).map(([type, content]) => 
          <meta key={`og:${type}`} property={`og:${type}`} content={content}/>)}
        {Object.entries(metadata.twitter).map(([type, content]) => 
          <meta key={`twitter:${type}`} name={`twitter:${type}`} content={content}/>)}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap" media="print" onLoad="this.media='all'" />
      </Head>

      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>

    </>
  )
}

export default MyApp

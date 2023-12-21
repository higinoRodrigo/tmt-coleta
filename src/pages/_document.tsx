import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="description" content="Aplicativo TMT Coleta" />
        <meta name="keywords" content="TMT" />
        <meta name="author" content="TMT" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f1f4f8" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#f1f4f8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="apple-mobile-web-app-title" content="TMT" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

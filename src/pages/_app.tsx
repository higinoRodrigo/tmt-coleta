import '../styles/globals.css'
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider as ProviderAntd } from "antd";
import { defaultValidateMessages } from "../utils/messagesAntd";
import ptBR from "antd/lib/locale/pt_BR";
import { StyleProvider } from '@ant-design/cssinjs';
import { SessionProvider } from "next-auth/react"
import dayjs from "dayjs";
import type { AppProps } from 'next/app';
import Head from 'next/head';
var duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderAntd locale={ptBR} form={{validateMessages: defaultValidateMessages}} theme={{token: {colorPrimary: '#7e0c11'}}}>
      <StyleProvider hashPriority="high">
        <SessionProvider session={pageProps.session}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
          </Head>
          <Component {...pageProps} />
        </SessionProvider>
      </StyleProvider>
    </ProviderAntd>
  )
}

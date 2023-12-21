import { Spin } from "antd"
import Head from "next/head"

export const Template = ({children, titlePage, loading}) => {

  return (
    <>
      <Head>
        <title>{titlePage ? `${titlePage} - TMT` : 'TMT'}</title>
      </Head>
      
      <Spin spinning={loading}>
        <div className="flex flex-col justify-center items-center text-center pt-10 pb-10 px-2">
          <div className="p-10 rounded-xl shadow-lg flex flex-col items-center max-w-[400px] w-full">
            {children}
          </div>
        </div>
      </Spin>
    </>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  Spin,
  message
} from "antd"
import ErrorMessages from "../../utils/ErrorMessages"
import { clearCpf, handleErros, isValidCPF } from "../../utils/functionsUtils"
import { IValuesPerfil, initialValues } from "./utilsPerfil"
import InputMask from 'react-input-mask'
import { FotoMotorista } from "./FotoMotorista"
import dayjs from "dayjs"

export const PerfilForm = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const loading = false
  const perfilData:any = {}
  const [isLoading, setIsLoading] = useState(false)
  const [disabledAll, setDisabledAll] = useState(false)
  const [msgErros, setMsgErros] = useState([]);
  const [filePhoto, setFilePhoto] = useState<any>();
  const isOnline = true
  const [urlFoto, setUrlFoto] = useState<string | null>(null);

  useEffect(() => {
    if(!isOnline){
      message.destroy()
      message.info("Você está offline, algumas funcionalidades podem não estar disponíveis.")
      setDisabledAll(true)

      const data: any = perfilData
      setUrlFoto(data?.imagemPerfil?.url || null)
      form.setFieldsValue({
        nome: data?.nome || '',
        email: data?.email || '',
        cpf: data?.cpf || '',
        cnh: data?.cnh || '',
        validadeCnh: data?.validadeCnh ? dayjs(data?.validadeCnh) : null,
        fone: data?.fone || ''
      })
    }

    if(isOnline){
      getPerfil()
    }
  }, [])
  
  const getPerfil = async () => {
    if(perfilData){
      const { nome, email, cpf, cnh, validadeCnh, fone, imagemPerfil } = perfilData
      const validadeCnhDate = validadeCnh ? dayjs(validadeCnh) : null
      setUrlFoto(imagemPerfil?.url || null)

      form.setFieldsValue({
        nome,
        email,
        cpf,
        cnh,
        validadeCnh: validadeCnhDate,
        fone
      })
    }
  }

  async function onFinish(values: IValuesPerfil) {
    return
  }

  const paramsCommon = {
    rules: [{ required: true }],
    style: { marginBottom: 0 },
    className: "w-full max-w-300",
  }

  return (
    <Spin spinning={loading || isLoading}>
      <div className="pb-24">
        <div className="flex flex-col items-center bg-white pt-2 rounded-md">
          <Form
            form={form}
            name="form_perfil"
            onFinish={onFinish}
            className="flex flex-col items-start w-full max-w-300 text-start "
            size="large"
            layout="vertical"
            initialValues={initialValues}
            disabled={disabledAll}
          >
            <FotoMotorista
              setFilePhoto={setFilePhoto}
              imageUrl={urlFoto}
              setImageUrl={setUrlFoto}
            />

            <Form.Item label="Nome"
              name="nome"
              style={{ marginBottom: 0 }}
              className="w-full max-w-300"
            >
              <Input
                placeholder="Nome"
                style={{ marginTop: "-10px" }}
                readOnly
              />
            </Form.Item>

            <Form.Item label="E-mail"
              name="email"
              {...paramsCommon}
            >
              <Input
                placeholder="E-mail"
                style={{ marginTop: "-10px" }}
              />
            </Form.Item>

            <Form.Item label="CPF"
              name="cpf"
              style={{ marginBottom: 0 }}
              className="w-full max-w-200"
            >
              <InputMask mask="999.999.999-99" readOnly>
                {() => 
                  <Input
                    size="large"
                    placeholder='CPF'
                    style={{ marginTop: "-10px" }}
                    readOnly
                  />
                }
              </InputMask>
            </Form.Item>

            <Form.Item label="CNH"
              name="cnh"
              {...paramsCommon}
            >
              <Input
                placeholder="CNH"
                style={{ marginTop: "-10px" }}
              />
            </Form.Item>

            <Form.Item label="Validade da CNH"
              name="validadeCnh"
              rules={[{ required: true }]}
              style={{ marginBottom: 0 }}
            >
              <DatePicker
                placeholder="Validade da CNH"
                style={{ marginTop: "-10px", width: "100%" }}
                format="DD/MM/YYYY"
                allowClear={false}
              />
            </Form.Item>

            <Form.Item label="Celular"
              name="fone"
              rules={[{required: true}]}
              style={{ marginBottom: 0 }}
              className="w-full max-w-200"
            >
              <InputMask mask="(99) 99999-9999" required style={{ marginTop: "-10px" }}>
                {() => <Input size="large" placeholder='Celular' />}
              </InputMask>
            </Form.Item>

            <Space direction="vertical" className="w-full items-center mt-10">
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={isLoading || disabledAll}
                  className="w-36"
                >
                  Salvar
                </Button>
              </Form.Item>
            </Space>
          </Form>

          <ErrorMessages messages={msgErros} onClearMessages={() => setMsgErros([])} />
        </div>
      </div>
    </Spin>
  )
}

import { Template } from "./Template"
import React, { useState } from "react"
import { useRouter } from "next/router"
import {
  Form,
  Input,
  Button,
  Typography,
  Space,
  message
} from "antd"
import { AiOutlineUser, AiOutlineLock, AiOutlineIdcard } from "react-icons/ai"
import Image from "next/image";
import sloganTmt from "/public/images/logoTmt2.png";
import ErrorMessages from "../../utils/ErrorMessages"
import Link from "next/link"
import { IValuesLogin, initialValues } from "./utilsLogin"

export const LoginForm = () => {
  const version = 'v1.0.0'
  const router = useRouter()
  const [form] = Form.useForm()
  const [isLoginStarted, setIsLoginStarted] = useState(false)
  const [msgErros, setMsgErros] = useState([]);

  async function onFinish(values: IValuesLogin) {
    router.push("/")
  }

  return (
    <Template titlePage="Entrar" loading={isLoginStarted}>
      <div className="text-gray-900 fixed bottom-4 left-4">
        <span>{version}</span>
      </div>

      <Image
        className="w-48"
        src={sloganTmt}
        alt="logo"
        priority
      />

      <Typography.Title level={5} className="max-w-350">
        Entre com seu usuário e senha
      </Typography.Title>

      <Form
        form={form}
        name="form_login"
        onFinish={onFinish}
        className="flex flex-col items-center w-full max-w-300"
        size="large"
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Favor informar o login!",
            },
          ]}
          className="w-full max-w-300"
          label="Login"
          style={{marginBottom: 0}}
        >
          <Input
            placeholder="Login"
            prefix={<AiOutlineUser />}
            style={{ marginTop: "-10px" }}
          />
        </Form.Item>

        <Form.Item
          name="senha"
          rules={[
            {
              required: true,
              message: "Favor informar sua senha!",
            },
          ]}
          className="w-full max-w-300"
          label="Senha"
        >
          <Input.Password 
            autoComplete="new-password"
            prefix={<AiOutlineLock />}
            type="password"
            placeholder="Senha"
            style={{ marginTop: "-10px" }}
          />
        </Form.Item>

        <Space direction="vertical" className="items-center mt-2">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoginStarted}
              className="w-36"
            >
              Entrar
            </Button>
          </Form.Item>

          <Link href={`/login/recuperar-senha`} className='flex mb-6 text-center w-full'>Esqueci minha senha</Link>
        </Space>
      </Form>

      <ErrorMessages messages={msgErros} onClearMessages={() => setMsgErros([])} />
    </Template>
  )
}

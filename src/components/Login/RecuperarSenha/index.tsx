import { Template } from "../Template"
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
import Image from "next/image";
import sloganTmt from "/public/images/logoTmt2.png";
import ErrorMessages from "../../../utils/ErrorMessages"
import Link from "next/link"
import { initialValues } from "./utilsRecuperarSenha"

export const RecuperarSenhaForm = () => {
  const router = useRouter()
  const [isLoginStarted, setIsLoginStarted] = useState(false)
  const [msgErros, setMsgErros] = useState([]);

  async function onFinish(values) {
    return
  }

  return (
    <Template titlePage="Entrar" loading={isLoginStarted}>
      <Image
        className="w-48"
        src={sloganTmt}
        alt="logo"
        priority
      />

      <Typography.Title level={5}>
        Informe os dados abaixo para recuperar sua senha
      </Typography.Title>

      <Form
        name="form_recuperar_senha"
        onFinish={onFinish}
        className="flex flex-col items-center w-full max-w-300"
        size="large"
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="login"
          rules={[{required: true}]}
          className="w-full max-w-300"
          label="Login"
        >
          <Input
            placeholder="Login"
            style={{ marginTop: "-10px" }}
          />
        </Form.Item>

        <Space direction="vertical" className="items-center mt-2">
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              disabled={isLoginStarted}
              className="w-44"
            >
              Recuperar Senha
            </Button>
          </Form.Item>

          <Link href={`/login`} className='flex text-center w-full text-lg'>Voltar</Link>
        </Space>
      </Form>

      <ErrorMessages messages={msgErros} onClearMessages={() => setMsgErros([])} />
    </Template>
  )
}

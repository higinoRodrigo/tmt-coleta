import { Button, DatePicker, Form, Input, Space } from "antd"
import Link from "next/link"
import InputMask from 'react-input-mask'

export const DadosForm = () => {
  const [form] = Form.useForm()

  const initialValues: any = {}

  const onFinish = async (values: any) => {
    return
  }

  return (
    <div className="flex flex-col items-center">
      <Form
        form={form}
        name="form_perfil"
        onFinish={onFinish}
        className="flex flex-col items-center w-full"
        size="large"
        layout="vertical"
        initialValues={initialValues}
      >
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

        <Form.Item label="CEP"
          name="cep"
          style={{ marginBottom: 0 }}
          className="w-full max-w-300"
        >
          <InputMask mask="99999-999">
            {() => 
              <Input
                size="large"
                placeholder='CEP'
                style={{ marginTop: "-10px" }}
              />
            }
          </InputMask>
        </Form.Item>

        <Form.Item label="Data"
          name="validadeCnh"
          rules={[{ required: true }]}
          style={{ marginBottom: 0 }}
          className="w-full max-w-300"
        >
          <DatePicker
            placeholder="Data"
            style={{ marginTop: "-10px", width: "100%" }}
            format="DD/MM/YYYY"
            allowClear={false}
          />
        </Form.Item>

        <Space direction="horizontal" className="w-full items-center justify-end mt-10 border-t pt-4">
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-36"
            >
              Salvar
            </Button>
          </Form.Item>

          <Form.Item>
            <Link href="/">
              <Button
                size="large"
                className="w-36"
              >
                Cancelar
              </Button>
            </Link>
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
}
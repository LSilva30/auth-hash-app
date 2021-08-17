import bcrypt from 'bcryptjs'
import { Form, Input, Button } from 'antd';

const mySalt = '$2b$10$ibXdpDiUvdVne89h2QdtKe'

export default function Login({ setUser, setReturningUser }) {
  function handlelogin({ email, password }) {
    const hashedPassword = bcrypt.hashSync( password, mySalt )
    fetch('https://auth-hash-api-ls.web.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: hashedPassword })
    })
    .then(response => response.json())
    .then(data => setUser(data.user || { email }))
    .catch(err => alert(err))
  }

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handlelogin}
    >
      <h1>Log In</h1>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="example@gmail.com"/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">Log In</Button>
        &nbsp;
        <Button type="ghost" onClick={() => setReturningUser(false)} htmlType="button">Go To Signup</Button>
      </Form.Item>
    </Form>
  )
}

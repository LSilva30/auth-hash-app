import bcrypt from 'bcryptjs'
import { Form, Input, Button } from 'antd';

const mySalt = '$2b$10$ibXdpDiUvdVne89h2QdtKe'

export default function Signup({ setUser, setReturningUser }) {
  function handleSignup({ email, password }) {
    const hashedPassword = bcrypt.hashSync( password, mySalt )
    fetch('https://auth-hash-api-ls.web.app/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: hashedPassword })
    })
    .then(response => response.json())
    .then(data => {
      setUser(data.user || { email })
    })
    .catch(err => alert(err))
  }

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleSignup}
    >
      <h1>Sign Up</h1>
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
        <Button type="primary" htmlType="submit">Sign Up</Button>
        &nbsp;
        <Button type="ghost" onClick={() => setReturningUser(true)} htmlType="button">Go To Login</Button>

      </Form.Item>
    </Form>
  )
}


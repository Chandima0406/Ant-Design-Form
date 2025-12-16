import { Form, Input, Button, Select, DatePicker, Checkbox } from 'antd';
import type { FormProps } from 'antd';
import type { Dayjs } from 'dayjs';
import './App.css';

type FieldType = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: Dayjs | null;
  website: string;
  agreeToTerms: boolean;
};

function App() {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Registration Form</h1>
      <Form
        form={form}
        name="registration"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Please input your full name!' }]}
          hasFeedback
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The passwords do not match!'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
          hasFeedback
        >
          <Select placeholder="Select your gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please select your date of birth!' }]}
          hasFeedback
        >
          <DatePicker style={{ width: '100%' }} placeholder="Select your date of birth" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Website"
          name="website"
          rules={[
            { type: 'url', message: 'Please enter a valid URL!' },
            { required: false }
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your website (optional)" />
        </Form.Item>

        <Form.Item<FieldType>
          name="agreeToTerms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions!')),
            },
          ]}
        >
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;

import React from 'react';
import { Card, Typography, Form, Input, Button, Row, Col, Flex , InputNumber, Select, List, DatePicker, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom'; 
import registerImage from './assetsRegister/register.jpg';
import { RegisterUser } from '../../apicalls/users';

function Register() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const onFinish = async (values) => {
      try {
        // dispatch(ShowLoading());
        const response = await RegisterUser(values);
        // dispatch(HideLoading())
        if (response.success) {
          message.success(response.message);
          navigate("/login");
        } else {
          message.error(response.message);
        }
      } catch (error) {
        // dispatch(HideLoading())
        message.error(error.message);
      }
    };
    const contactSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <List value="86">+63</List>
          </Select>
        </Form.Item>
      );
    //   const [form] = Form.useForm();
    //     const onFinish = (values) => {
    //         console.log('Received values of form: ', values);
    //     };

    return (
        <div className='body'> 
            <div style={{ position: 'absolute', top: 10, right: 10,  padding: '8px' }}>
                <Form.Item className='topbar'style={{ marginBottom: '20px' }}> 
                <Button type='link' className='btntopbar'>About</Button>
                </Form.Item>
                <Form.Item className='topbar' style={{ marginBottom: '20px' }}> 
                <Button type='link' className='btntopbar'>Contact Us</Button>
                </Form.Item>
            </div>
        <div style={{ padding: '20px', marginTop: '60px' }}>
        <Card className="form-containerRegister">
            <Flex gap="large" align="center">
                <Flex vertical flex={1}>
                    <Typography.Title level={3} type="primary" strong className="title"> 
                        Register Your ID
                    </Typography.Title>
                    <Typography.Text type='secondary' strong className="slogan">
                Join For LCC Exclusive Access!
            </Typography.Text>
                    <Form layout='vertical' onFinish={onFinish} autoComplete="off" >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item 
                                    label="Full Name" 
                                    name="name" 
                                    rules={[{ required: true, message: 'Please input your full name!' }]}>
                                    <Input size="large" placeholder='Enter Full Name'/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Year Level"
                                    name="level"
                                    rules={[{ required: true, message: 'Please select your grade level!' }]}
                                >
                                    <Select size="large" placeholder="Select Grade Level">
                                        <Select.Option value="1">Grade 11</Select.Option>
                                        <Select.Option value="2">Grade 12</Select.Option>
                                        {/* Add other options */}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item 
                                    label="Student ID Number" 
                                    name="idNumber" 
                                    rules={[
                                        {   
                                            required: true, 
                                            message: 'Please input your student ID number!' 
                                        },
                                        {
                                            pattern: /^\d{2}-\d{5}$/,
                                            message: 'Please enter a valid student ID Number!'
                                        }
                                    ]}>
                                    <Input size="large" placeholder='Enter Student ID Number (eg."21-10378")'/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    name="phone"
                                    label="Contact Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your contact number!',
                                        },
                                        {
                                            pattern: /^[0-9]{10}\/?$/,
                                            message: 'Please enter a valid contact number!'
                                        },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        addonBefore={contactSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder='Enter Contact Number'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={20}>
                                <Form.Item 
                                    label="Email Address" 
                                    name="email" 
                                    rules={[
                                        { required: true, message: 'Please input email address!' },
                                        { type: 'email', message: 'Invalid email address'}
                                    ]}>
                                    <Input size="large" placeholder='Enter Email Address'/>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item 
                                    name="age" 
                                    label="Age" 
                                    rules={[{ required: true, type: 'number', min: 18, max: 99, message: 'Must be 18 years old and above'}]}>
                                    <InputNumber size="large" placeholder='Enter Age'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Address" 
                                    name="address" 
                                    rules={[{ required: true, message: 'Please input your address!' }]}>
                                    <Input size="large" placeholder='Enter Address'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                             <Col span={12}>
                                <Form.Item 
                                    label="Password" 
                                    name="password" 
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password size="large" placeholder='Enter your password'/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    label="Confirm Password" 
                                    name="confirmPassword"
                                    dependencies={['password']} 
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}>
                                    <Input.Password size="large" placeholder='Re-Enter your password'/>
                                </Form.Item>
                            </Col>   
                            {/* {
                                (error && <Alert description={error} type='error' showIcon cloasable className='alert'/>)
                            } */}                                                                             
                        </Row>

    
                        <Form.Item>
                            <Button 
                                type='primary' 
                                htmlType="submit" size= "large" 
                                className="btn" 
                                // {loading ? <Spin/> : 'Create Account'}
                                >
                                Create Account
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to= "/login">
                                <Button size= "large" className="btn">
                                    Sign In
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </Card>
        </div>
     </div>
    );
};

export default Register;

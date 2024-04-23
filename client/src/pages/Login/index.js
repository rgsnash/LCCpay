import React from 'react';
import { Card, Typography, Form, Input, Button, Row, Col, Flex , message} from 'antd';
import { Link, useNavigate } from 'react-router-dom'; 
import { LoginUser } from '../../apicalls/users';
import logo from './assetsLogin/LCClogo.png';

function Login() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const onFinish = async (values) => {
      try {
        // dispatch(ShowLoading());
        const response = await LoginUser(values);
        // dispatch(HideLoading());
        if (response.success) {
          message.success(response.message);
          localStorage.setItem("token", response.data);
        // window.location.href = "/Dashboard/main";
          navigate("/Dashboard/main");
        } else {
          message.error(response.message);
        }
      } catch (error) {
        // dispatch(HideLoading());
        message.error(error.message);
      }
    };

    return (
        <div className='body'>

                <div  style={{ position: 'absolute',  left: 10,  padding: '5px' }}>
                <img 
                   src={logo} 
                   alt="Logo" 
                   className= 'logo' 
                    style={{ width: '100%', height: '110px' , marginBottom: '20px' }} />
                </div>
        
                        
            <div style={{ position: 'absolute', top: 10, right: 10,  padding: '8px' }}>
                
                <Form.Item className='topbar'> 
                <Button type='link' className='btntopbar'>About</Button>
                </Form.Item>
                <Form.Item className='topbar' > 
                <Button type='link' className='btntopbar'>Contact Us</Button>
                </Form.Item>
                <Form.Item className='topbar'> 
                <Link to= "/" >
                    <Button type='link' className='btntopbar'> Home </Button>
                </Link>   
                </Form.Item>
            </div>
            <div style={{ padding: '20px', marginTop: '60px' }}>
            <Card className="form-containerLogin">
                <Flex gap="large" align="center">
                    <Flex vertical flex={1}>
                        <Typography.Title level={3} type="primary" strong className="title"> 
                            Login To Your Account
                        </Typography.Title>
                        <Typography.Text type='secondary' strong className="slogan">
                            Join For LCC Exclusive Access!
                        </Typography.Text>
                        <Form layout='vertical' onFinish={onFinish} autoComplete="off"  >
                            <Row gutter={16} justify="center">
                                <Col span={16}>
                                <Form.Item 
                                        label="Student ID Number" 
                                        name="idNumber" 
                                        rules={[
                                            {   
                                                required: true, 
                                                message: 'Please input your student ID number!' },
                                            {
                                                pattern: /^\d{2}-\d{5}$/,
                                                message: 'Please enter a valid student ID Number!'
                                            }
                                            ]}>
                                            <Input size = "Large" placeholder='Enter Student ID Number (eg."21-10378")'/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} justify="center">
                                <Col span={16}>
                                    <Form.Item 
                                        label="Password" 
                                        name="password" 
                                        rules={[{ required: true, message: 'Please input your password!' }]}>
                                            <Input.Password size = "Large" placeholder='Enter your password'/>
                                    </Form.Item>
                                </Col>                                                                             
                                {/* {
                                    (error && <Alert description={error} type='error' showIcon cloasable className='alert'/>)
                                } */}
                            </Row>
                            <Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button 
                                        type= 'primary'
                                        htmlType="submit"  
                                        className="btn" 
                                        style={{ width: '50%'}}
                                        // {loading ? <Spin/> : 'Create Account'}
                                        >
                                        Log In
                                    </Button>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button type="link" block className='btn'>
                                    Forgot Password?
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to= "/register">
                                    <Button className="btn">
                                        Create Account
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

export default Login;

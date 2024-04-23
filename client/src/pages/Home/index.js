import React from 'react';
import { Card, Typography, Form, Input, Button, Row, Col, Flex , InputNumber, Alert, Spin, message} from 'antd';
import { Link } from 'react-router-dom'; 


const Home = () => {
    return(
        <div>
            
            <div style={{ position: 'absolute', top: 10, right: 10,  padding: '8px' }}>
                <Form.Item className='topbar'style={{ marginBottom: '20px'}}> 
                <Button type='link' className='homebtn'>About</Button>
                </Form.Item>
                <Form.Item className='topbar' style={{ marginBottom: '20px' }}> 
                <Button type='link'className='homebtn'>Contact Us</Button>
                </Form.Item>
                <Form.Item className='topbar' style={{ marginBottom: '20px' }}> 
                    <Link to ="/login">
                        <Button>Sign In</Button>
                    </Link>
                </Form.Item>
            </div>
            <div className='homeBg'>
                 <div>
                    <Typography type='secondary' className='homeSecondary'> WITH YOUR SCHOOL ID</Typography>
                    <Typography type='primary' className='homeSlogan'> MAKE YOUR PAYMENT CONTACTLESS <br/> AND TRACK YOUR BUDGET </Typography>
                    <Form.Item className='homeSignup' style={{ marginBottom: '20px' }}> 
                        <Link to ="/register">
                             <Button type='primary'>Sign Up</Button>
                        </Link>
                    </Form.Item>
                </div>
            </div>
            <div>
            <Typography type='primary' className='homeHow'> HOW IT WORKS</Typography>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Home;

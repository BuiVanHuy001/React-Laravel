import React, {useState} from 'react';
import {Form, Input, Button, Card, Typography, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../context/AuthContext.jsx";
import {WEB_PATHS} from "../../config/webPath.js";

const {Title, Text} = Typography;

export const Login = () => {
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (credentials) => {
        setLoading(true);
        try {
            await login(credentials);
            message.success('Đăng nhập thành công!');
            navigate(WEB_PATHS.USERS.INDEX);
        } catch (error) {
            const serverMessage = error.response?.data?.message;
            const defaultMessage = 'Có lỗi xảy ra, vui lòng thử lại.';

            if (error.response?.status === 429) {
                message.error(serverMessage || 'Hệ thống đang bận, vui lòng thử lại sau 1 phút.');
            } else if (error.response?.status === 401) {
                message.error(serverMessage || 'Email hoặc mật khẩu không đúng');
            } else {
                message.error(serverMessage || defaultMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f2f5'
        }}>
            <Card style={{width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <div style={{textAlign: 'center', marginBottom: 24}}>
                    <Title level={2} style={{color: '#1890ff', marginBottom: 0}}>TECHAPP</Title>
                    <Text type="secondary">Hệ thống quản lý người dùng</Text>
                </div>

                <Form
                    name="login_form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: 'Vui lòng nhập Email!'},
                            {type: 'email', message: 'Email không hợp lệ!'}
                        ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Email của bạn"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'Vui lòng nhập mật khẩu!'},
                            {min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự'}
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials, getAvatarColor } from '../../utils/format';

const { Header: AntHeader } = Layout;

export const Header = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    const userMenuItems = [
        {
            key: 'profile',
            label: 'Thông tin cá nhân',
            icon: <UserOutlined />,
            onClick: () => navigate('/profile'),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];

    return (
        <AntHeader style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#fff',
            padding: '0 24px',
            boxShadow: '0 2px 8px #f0f1f2',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            width: '100%'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: '40px',
                    color: '#1890ff',
                    cursor: 'pointer'
                }} onClick={() => navigate('/')}>
                    TECHAPP
                </div>

                <Menu
                    mode="horizontal"
                    selectedKeys={[window.location.pathname]} // Tự động active menu theo URL
                    style={{ flex: 1, borderBottom: 'none' }}
                    items={[
                        {
                            key: '/dashboard',
                            icon: <HomeOutlined />,
                            label: <Link to="/dashboard">Trang chủ</Link>
                        },
                        {
                            key: '/users',
                            icon: <TeamOutlined />,
                            label: <Link to="/users">Quản lý người dùng</Link>
                        },
                    ]}
                />
            </div>

            <div className="user-profile">
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                    <Space style={{ cursor: 'pointer', padding: '0 8px' }}>
                        <span style={{ fontWeight: '500' }}>{user?.full_name}</span>
                        <Avatar
                            src={user?.avatar_url}
                            style={{
                                backgroundColor: user?.avatar_url ? 'transparent' : getAvatarColor(user?.full_name),
                                verticalAlign: 'middle'
                            }}
                        >
                            {getInitials(user?.full_name)}
                        </Avatar>
                    </Space>
                </Dropdown>
            </div>
        </AntHeader>
    );
};
import { Card, Avatar, Typography, Row, Col, Button, Descriptions, Tag } from 'antd';
import { UserOutlined, EditOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Đang tải thông tin...</div>;
    }

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Row justify="center">
                <Col xs={24} md={16} lg={12}>
                    <Card
                        cover={
                            <div style={{
                                height: 150,
                                background: 'linear-gradient(90deg, #1890ff 0%, #001529 100%)',
                                position: 'relative'
                            }} />
                        }
                        actions={[
                            <Button type="text" icon={<EditOutlined />} key="edit">
                                Cập nhật thông tin
                            </Button>,
                        ]}
                    >
                        <div style={{ marginTop: -60, textAlign: 'center', marginBottom: 24 }}>
                            <Avatar
                                size={100}
                                src={user.avatar}
                                icon={<UserOutlined />}
                                style={{ border: '4px solid white', backgroundColor: '#87d068' }}
                            />
                            <div style={{ marginTop: 16 }}>
                                <Title level={3} style={{ marginBottom: 0 }}>{user.full_name}</Title>
                                <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
                                    {(user.role || 'User').toUpperCase()}
                                </Tag>
                            </div>
                        </div>

                        <Descriptions title="Thông tin chi tiết" column={1} bordered>
                            <Descriptions.Item label={<><MailOutlined /> Email</>}>
                                {user.email}
                            </Descriptions.Item>

                            <Descriptions.Item label={<><PhoneOutlined /> Số điện thoại</>}>
                                {user.phone_number || 'Chưa cập nhật'}
                            </Descriptions.Item>

                            <Descriptions.Item label={<><CalendarOutlined /> Ngày sinh</>}>
                                {user.dob ? dayjs(user.dob).format('DD/MM/YYYY') : 'Chưa cập nhật'}
                            </Descriptions.Item>

                            <Descriptions.Item label="Ngày tham gia">
                                {dayjs(user.created_at).format('DD/MM/YYYY')}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
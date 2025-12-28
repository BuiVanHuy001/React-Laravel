import React, {useEffect, useState, useCallback} from 'react';
import {Modal, Descriptions, Avatar, Tag, Divider, Button, message} from 'antd';
import {
    CalendarOutlined,
    MailOutlined,
    PhoneOutlined,
    ClockCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import {getUser} from "../../services/userService.js";
import {getAvatarColor, getInitials} from "../../utils/format.js";

dayjs.extend(relativeTime);
dayjs.locale('vi');

export const UserDetailModal = ({userId, isOpen, setIsOpen, handleOpenEditModal}) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = useCallback(async (userId) => {
        try {
            setLoading(true);
            const response = await getUser(userId);

            if (response && response.data) {
                setSelectedUser(response.data);
            }
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen && userId) {
            fetchUser(userId);
        }
    }, [userId, isOpen, fetchUser]);

    if (!userId) return null;

    return (
        <Modal
            title="Thông tin chi tiết người dùng"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={[
                <Button
                    key="edit"
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => {
                        handleOpenEditModal(userId);
                        setIsOpen(false);
                    }}
                >
                    Chỉnh sửa
                </Button>,
                <Button key="close" onClick={() => setIsOpen(false)}>
                    Đóng
                </Button>
            ]}
            width={700}
            loading={loading}
        >
            {selectedUser ? (
                <>
                    <div style={{textAlign: 'center', marginBottom: 20}}>

                        <Avatar
                            src={selectedUser.avatar_url}
                            size={100}
                            style={{
                                backgroundColor: selectedUser.avatar_url ? 'transparent' : getAvatarColor(selectedUser.full_name),
                                marginBottom: 10, border: '2px solid #f0f0f0'
                            }}
                        >
                            {getInitials(selectedUser.full_name)}
                        </Avatar>
                        <h2 style={{margin: 0}}>{selectedUser.full_name}</h2>
                        <Tag color="blue">Thành viên hệ thống</Tag>
                    </div>

                    <Divider titlePlacement="left">Thông tin cơ bản</Divider>

                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item label={<span><MailOutlined/> Email</span>}>
                            {selectedUser.email}
                        </Descriptions.Item>

                        <Descriptions.Item label={<span><CalendarOutlined/> Ngày sinh</span>}>
                            {selectedUser.dob ? dayjs(selectedUser.dob).format('DD/MM/YYYY') : 'Chưa cập nhật'}
                        </Descriptions.Item>

                        <Descriptions.Item label={<span><PhoneOutlined/> Số điện thoại</span>}>
                            {selectedUser.phone_number || 'Chưa có'}
                        </Descriptions.Item>

                        <Descriptions.Item label={<span><ClockCircleOutlined/> Ngày tham gia</span>}>
                            {dayjs(selectedUser.created_at).format('DD/MM/YYYY HH:mm')} ({dayjs(selectedUser.created_at).fromNow()})
                        </Descriptions.Item>

                        <Descriptions.Item label="Trạng thái">
                            <Tag color="green">Đang hoạt động</Tag>
                        </Descriptions.Item>

                        <Descriptions.Item label="ID Hệ thống (UUID)">
                            <span style={{fontSize: '12px', color: '#888'}}>{selectedUser.id}</span>
                        </Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <div style={{textAlign: 'center', padding: '40px 0'}}>
                    Đang tải thông tin người dùng...
                </div>
            )}
        </Modal>
    );
};
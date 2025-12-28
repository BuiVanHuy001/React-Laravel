import React, {useEffect, useState} from 'react';
import {Modal, Form, message} from 'antd';
import dayjs from 'dayjs';
import {getUser, updateUser} from '../../services/userService';
import {UserForm} from "./UserForm.jsx";

export const UserEditModal = ({userId, isOpen, setIsOpen, fetchUsers}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        if (isOpen && userId) {
            loadUserData();
        } else {
            setAvatarFile(null);
            setAvatarPreview(null);
        }
    }, [isOpen, userId]);

    const loadUserData = async () => {
        try {
            setLoading(true);
            const response = await getUser(userId);
            const userData = response.data;

            form.setFieldsValue({
                ...userData,
                dob: userData.dob ? dayjs(userData.dob) : null,
            });

            setAvatarPreview(userData.avatar_url);
        } catch (error) {
            message.error(error);
            setIsOpen(false);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        try {
            setLoading(true);
            let userData;

            if (avatarFile) {
                userData = new FormData();
                userData.append('full_name', values.full_name);
                userData.append('email', values.email);
                userData.append('dob', values.dob ? values.dob.format('YYYY-MM-DD') : '');
                userData.append('phone_number', values.phone_number || '');
                userData.append('avatar', avatarFile);
            } else {
                userData = {
                    full_name: values.full_name,
                    email: values.email,
                    dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
                    phone_number: values.phone_number || '',
                };
            }

            await updateUser(userId, userData);
            message.success("Cập nhật thành công!");
            setIsOpen(false);
            fetchUsers();
        } catch (error) {
            console.error('Update error:', error);
            if (error.response?.status === 422) {
                const serverErrors = error.response.data.errors;
                form.setFields(Object.keys(serverErrors).map(key => ({
                    name: key,
                    errors: serverErrors[key]
                })));
            } else {
                const errorMsg = error.response?.data?.message || error.message || 'Có lỗi xảy ra!';
                message.error(typeof errorMsg === 'string' ? errorMsg : 'Lỗi hệ thống không xác định');
            }
        }
    };

    const handleAvatarChange = (info) => {
        const file = info.file.originFileObj || info.file;

        const isImage = file.type?.startsWith('image/');
        if (!isImage) {
            message.error('Chỉ được upload file ảnh!');
            return;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
            return;
        }

        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setAvatarPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    return (
        <Modal title="Chỉnh sửa người dùng" open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
            <UserForm
                form={form}
                onFinish={handleUpdate}
                loading={loading}
                isEdit={true}
                avatarPreview={avatarPreview}
                onAvatarChange={handleAvatarChange}
            />
        </Modal>
    );
};
import {Form, message, Modal} from "antd";
import {storeUser} from "../../services/userService.js";
import {UserForm} from "./UserForm.jsx";
import {useState} from "react";

export const CreateUserModal = ({setIsOpen, isOpen, fetchUsers}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleCreateUser = async (values) => {
        try {
            setLoading(true);
            let userData;

            // FIX: Phải dùng FormData để gửi được file ảnh lên Laravel
            if (avatarFile) {
                userData = new FormData();
                userData.append('full_name', values.full_name);
                userData.append('email', values.email);
                userData.append('password', values.password);
                userData.append('dob', values.dob ? values.dob.format('YYYY-MM-DD') : '');
                userData.append('phone_number', values.phone_number || '');
                userData.append('avatar', avatarFile);
            } else {
                // Nếu không có ảnh, gửi JSON object bình thường cho nhẹ
                userData = {
                    ...values,
                    dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
                };
            }

            await storeUser(userData);
            message.success('Tạo người dùng thành công!');

            // Reset toàn bộ trạng thái sau khi tạo xong
            setIsOpen(false);
            form.resetFields();
            setAvatarFile(null);
            setAvatarPreview(null);

            if (fetchUsers) fetchUsers();
        } catch (error) {
            if (error.response?.status === 422) {
                const serverErrors = error.response.data.errors;
                form.setFields(Object.keys(serverErrors).map(key => ({
                    name: key,
                    errors: serverErrors[key]
                })));
            } else {
                message.error('Có lỗi xảy ra khi tạo người dùng!');
            }
        } finally {
            setLoading(false);
        }
    }

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
        <Modal
            title="Basic Modal"
            closable={{'aria-label': 'Custom Close Button'}}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
        >
            <UserForm
                form={form}
                onFinish={handleCreateUser}
                loading={loading}
                onAvatarChange={handleAvatarChange}
                avatarPreview={avatarPreview}
            />
        </Modal>
    )
}
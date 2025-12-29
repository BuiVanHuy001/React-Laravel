import {Avatar, Button, DatePicker, Form, Input, Upload} from "antd";
import {getAvatarColor, getInitials} from "../../utils/format.js";
import {UploadOutlined} from "@ant-design/icons";

export const UserForm = ({form, onFinish, loading, isEdit = false, avatarPreview, onAvatarChange}) => {
    const fullName = Form.useWatch('full_name', form);

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Ảnh đại diện">
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <Avatar
                        size={80}
                        src={avatarPreview}
                        style={{
                            backgroundColor: avatarPreview ? 'transparent' : getAvatarColor(fullName),
                        }}
                    >
                        {!avatarPreview && getInitials(fullName)}
                    </Avatar>
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={onAvatarChange}
                    >
                        <Button icon={<UploadOutlined/>}>
                            {avatarPreview ? 'Đổi ảnh' : 'Chọn ảnh'}
                        </Button>
                    </Upload>
                </div>
            </Form.Item>

            <Form.Item
                label="Họ và Tên"
                name="full_name"
                rules={[{required: true, message: 'Vui lòng nhập họ và tên!'}]}
            >
                <Input placeholder="Nguyễn Văn A"/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {required: true, message: 'Vui lòng nhập email!'},
                    {type: 'email', message: 'Email không đúng định dạng!'}
                ]}
            >
                <Input placeholder="example@gmail.com"/>
            </Form.Item>

            {/* Password chỉ bắt buộc khi Tạo mới */}
            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    {required: !isEdit, message: 'Vui lòng nhập mật khẩu!'},
                    {min: 6, message: 'Mật khẩu phải từ 6 ký tự trở lên!'}
                ]}
            >
                <Input.Password placeholder={isEdit ? "Để trống nếu không muốn đổi" : "Nhập mật khẩu"}/>
            </Form.Item>

            <Form.Item label="Ngày sinh" name="dob">
                <DatePicker style={{width: '100%'}} format="DD/MM/YYYY"/>
            </Form.Item>

            <Form.Item
                label="Số điện thoại"
                name="phone_number"
                rules={[
                    {
                        pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                        message: 'Số điện thoại không hợp lệ. VD: +84 123 456 789, 0123456789, +1 (555) 123-4567',
                    },
                    {
                        min: 10,
                        message: 'Số điện thoại phải có ít nhất 10 số',
                    },
                    {
                        max: 17,
                        message: 'Số điện thoại không được quá 17 số',
                    }
                ]}
            >
                <Input placeholder="+1 (441) 944-8968"/>
            </Form.Item>

            <Form.Item style={{marginBottom: 0, textAlign: 'right'}}>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    {isEdit ? 'Lưu thay đổi' : 'Tạo người dùng'}
                </Button>
            </Form.Item>
        </Form>
    );
}
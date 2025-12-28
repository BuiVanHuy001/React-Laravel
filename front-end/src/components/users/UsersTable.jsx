import {Avatar, Button, Dropdown, Modal, Pagination, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import {getAvatarColor, getInitials} from "../../utils/format.js";

dayjs.extend(relativeTime);
dayjs.locale('vi');

export const UsersTable = ({users, fetchUsers, pagination, handleOpenDetailModal, loading, handleDeleteUser, handleOpenEditingModal}) => {
    const userList = Array.isArray(users) ? users : [];

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (text, record, index) => (
                <span>#{((pagination.current_page - 1) * pagination.per_page) + index + 1}</span>
            )
        },
        {
            title: 'Tên',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (text, record) => (
                <Space>
                    <Avatar
                        src={record.avatar_url}
                        size="large"
                        style={{
                            backgroundColor: record.avatar_url ? 'transparent' : getAvatarColor(text),
                        }}
                    >
                        {getInitials(text)}
                    </Avatar>
                    <a style={{fontWeight: '500'}}
                       onClick={() => handleOpenDetailModal(record.id)}
                    >{text}</a>
                </Space>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
            render: (text) => <span>{dayjs(text).format('DD/M/YY')}</span>
        },
        {
            title: 'Số điện thoại',
            key: 'phone_number',
            dataIndex: 'phone_number',
        },
        {
            title: 'Ngày tham gia',
            key: 'created_at',
            dataIndex: 'created_at',
            render: (text) => (
                <span>{dayjs(text).fromNow()}</span>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            width: 80,
            render: (_, record) => {
                const items = [
                    {
                        key: 'view',
                        label: 'Xem chi tiết',
                        icon: <EyeOutlined/>,
                        onClick: () => handleOpenDetailModal(record.id),
                    },
                    {
                        key: 'edit',
                        label: 'Chỉnh sửa',
                        icon: <EditOutlined/>,
                        onClick: () => handleOpenEditingModal(record.id),
                    },
                    {
                        type: 'divider',
                    },
                    {
                        key: 'delete',
                        label: 'Xóa người dùng',
                        icon: <DeleteOutlined/>,
                        danger: true,
                        onClick: () => {
                            Modal.confirm({
                                title: 'Xác nhận xóa',
                                content: 'Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.',
                                okText: 'Xóa',
                                okType: 'danger',
                                cancelText: 'Hủy',
                                onOk: () => handleDeleteUser(record.id),
                            });
                        }
                    },
                ];
                return (
                    <Dropdown menu={{items}} trigger={['click']} placement="bottomRight">
                        <Button
                            type="text"
                            icon={<MoreOutlined style={{fontSize: '18px'}}/>}
                        />
                    </Dropdown>
                );
            },
        },
    ];
    return (
        <>
            <Table columns={columns}
                   dataSource={userList}
                   rowKey="id"
                   pagination={false}
                   bordered={true}
                   loading={loading}
            />
            <Pagination
                current={pagination.current_page}
                total={pagination.total}
                pageSize={pagination.per_page}
                showSizeChanger
                align="end"
                showTotal={total => `Hiện ${userList.length} trong số ${total} người dùng`}
                style={{marginTop: 10}}
                onChange={(page, pageSize) => {
                    fetchUsers(page, pageSize);
                }}
            />
        </>
    );
}
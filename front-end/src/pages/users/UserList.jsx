import {useEffect, useState} from "react";
import {destroyUser, getUsers} from "../../services/userService.js";
import {UsersTable} from "../../components/users/UsersTable.jsx";
import {Button, message} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {CreateUserModal} from "../../components/users/CreateUserModal.jsx";
import {UserDetailModal} from "../../components/users/UserDetailModal.jsx";
import {UserEditModal} from "../../components/users/UserEditModal.jsx";

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showingUserId, setShowingUserId] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(false);

    const fetchUsers = async (page = 1, perPage = 10) => {
        try {
            setLoading(true);
            const response = await getUsers(page, perPage);

            if (response && response.meta.total > 0) {
                setUsers(Array.isArray(response.data) ? response.data : []);
                setPagination(response.meta);
            }
        } catch (error) {
            message.error("Lỗi khi lấy danh sách:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await destroyUser(userId);
            message.success('Xóa người dùng thành công!');
            await fetchUsers(pagination.current_page);
        } catch (error) {
            message.error(error);
        }
    }

    const handleOpenDetailModal = (userId) => {
        setShowDetailModal(true);
        setShowingUserId(userId);
    };

    const handleOpenEditModal = async (userId) => {
        setShowEditModal(true);
        setEditingUser(userId);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{padding: 20}}>
            <h2>Danh sách người dùng</h2>
            <Button type="primary"
                    icon={<UserAddOutlined/>}
                    style={{marginBottom: 10}}
                    onClick={() => setShowCreateUserModal(true)}
            >
                Tạo người dùng mới
            </Button>

            <UsersTable
                users={users}
                fetchUsers={fetchUsers}
                pagination={pagination}
                handleOpenDetailModal={handleOpenDetailModal}
                handleOpenEditingModal={handleOpenEditModal}
                loading={loading}
                handleDeleteUser={handleDeleteUser}
            />

            <CreateUserModal
                isOpen={showCreateUserModal}
                setIsOpen={setShowCreateUserModal}
                fetchUsers={fetchUsers}
            />

            <UserDetailModal
                userId={showingUserId}
                isOpen={showDetailModal}
                setIsOpen={setShowDetailModal}
                handleOpenEditModal={handleOpenEditModal}
            />

            <UserEditModal
                userId={editingUser}
                isOpen={showEditModal}
                setIsOpen={setShowEditModal}
                fetchUsers={fetchUsers}
            />
        </div>
    );
}
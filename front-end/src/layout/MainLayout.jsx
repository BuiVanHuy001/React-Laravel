import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import {Header} from "../components/shared/Header.jsx";

const { Content, Footer } = Layout;

export const MainLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />

            <Content style={{ padding: '24px' }}>
                <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
                    {/* @yield('content') của React Router DOM */}
                    <Outlet />
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                User Management System ©2025 Created by IT Student
            </Footer>
        </Layout>
    );
};
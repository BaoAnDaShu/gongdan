import React from 'react';
import { Layout, Menu, Button, message } from 'antd';
import { 
  DashboardOutlined, 
  FileTextOutlined, 
  PlusOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('已退出登录');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" style={{ 
          height: '32px', 
          margin: '16px', 
          background: 'rgba(255, 255, 255, 0.3)',
          color: 'white',
          textAlign: 'center',
          lineHeight: '32px'
        }}>
          工单系统
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() => navigate('/dashboard')}>
            仪表盘
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />} onClick={() => navigate('/tickets')}>
            工单列表
          </Menu.Item>
          <Menu.Item key="3" icon={<PlusOutlined />} onClick={() => navigate('/create-ticket')}>
            创建工单
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            退出登录
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <h2>欢迎使用工单系统</h2>
            <p>这是一个基于React和Node.js构建的工单管理系统。</p>
            <p>您可以在这里创建、查看和管理工单。</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
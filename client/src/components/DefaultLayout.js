import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  HistoryOutlined,
  IdcardOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const userMenu = [
    {
      key: "home",
      title: "Dashboard",
      icon: <HomeOutlined />,
      onClick: () => handleMenuClick("/Dashboard/main"),
      path: "/Dashboard/main"
    },
    {
      key: "transaction",
      title: "Transaction History",
      icon: <HistoryOutlined />,
      onClick: () => handleMenuClick("/transactions"),
      path: "/transactions"
    },
    {
      key: "schoolId",
      title: "Load School ID",
      icon: <IdcardOutlined />,
      onClick: () => handleMenuClick("/load"),
      path: "/load"
    },
    {
      key: "balance",
      title: "Balance",
      icon: <WalletOutlined />,
      onClick: () => handleMenuClick("/balance"),
      path: "/balance"
    },
    {
      key: "profile",
      title: "Profile",
      icon: <UserOutlined />,
      onClick: () => handleMenuClick("/profile"),
      path: "/profile"
    },
    {
      key: "logout",
      title: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  ];

//   admin

  const adminMenu = [
    {
      key: "home",
      title: "Dashboard",
      icon: <HomeOutlined />,
      onClick: () => handleMenuClick("/Dashboard/main"),
      path: "/Dashboard/main"
    },
    {
      key: "users",
      title: "Users",
      icon: <UsergroupAddOutlined />,
      onClick: () => handleMenuClick("/users"),
      path: "/users"
    },
    {
        key: "transaction",
        title: "Transaction History",
        icon: <HistoryOutlined />,
        onClick: () => handleMenuClick("/transactions"),
        path: "/transactions"
      },
      {
        key: "schoolId",
        title: "Load School ID",
        icon: <IdcardOutlined />,
        onClick: () => handleMenuClick("/load"),
        path: "/load"
      },
      {
        key: "balance",
        title: "Balance",
        icon: <WalletOutlined />,
        onClick: () => handleMenuClick("/balance"),
        path: "/balance"
      },
      {
        key: "profile",
        title: "Profile",
        icon: <UserOutlined />,
        onClick: () => handleMenuClick("/profile"),
        path: "/profile"
      },
      {
        key: "logout",
        title: "Logout",
        icon: <LogoutOutlined />,
        onClick: () => {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }  
    
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;

  return (
    <Layout>
      <Sider width={200} style={{ background: '#f0f2f5' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          style={{ borderRight: 0 }}
        >
          {menuToRender.map(item => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      {children}
    </Layout>
  );
}

export default DefaultLayout;

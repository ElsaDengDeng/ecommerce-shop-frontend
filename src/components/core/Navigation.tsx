import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { LocaleContext } from "../../App";
import { useSelector } from "react-redux";
import { AppState } from "../../app/createRootReducer";
import { RouterState } from "connected-react-router";
import { isAuth } from "../../helpers/auth";
import { Badge, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { Jwt } from "../../app/models/auth";
import {
  SettingOutlined
} from '@ant-design/icons';
import { useTotal } from "../../app/anotherStore";
import { itemCount } from "../../helpers/cart";

const Navigation: React.FC = () => {
  const intl = useIntl(); // 获取翻译钩子
  const context = useContext(LocaleContext); // 获取上下文
  const [count, setCount] = useTotal() // 获取购物车数量上下文
  if (!context) throw new Error("LocaleContext is missing");

  const router = useSelector<AppState, RouterState>((state) => state.router);
  const pathname = router.location.pathname;
  const [isAdmin, setIsAdmin] = useState(false); // 添加 isAdmin 状态
  useEffect(() => {
    const auth = isAuth() as Jwt;
    if (auth && auth.user.role === 1) {
      setIsAdmin(true); // 设置管理员状态
    } else {
      setIsAdmin(false); // 设置非管理员状态
    }
  }, [isAuth]); // 根据 `isAuth` 或其他依赖执行

  useEffect(() => {
    setCount(itemCount())
  })
  const dashboardUrl = isAdmin ? "/admin/dashboard" : "/user/dashboard"; // 使用状态构造 URL

  console.log(pathname)
  type MenuItem = Required<MenuProps>['items'][number];
  const items: MenuItem[] = [
    {
      key: 'home',
      label: (
        <Link to="/">
          <FormattedMessage id="home" />
        </Link>
      ),
    },
    {
      key: 'shop',
      label: (
        <Link to="/shop">
          <FormattedMessage id="shopCentre" />
          <Badge count={count} offset={[5, -10]}></Badge>
        </Link>
      ),
    },
    !isAuth() ? [
      {
        key: 'signin',
        label: (
          <Link to="/signin">
            <FormattedMessage id="login" />
          </Link>
        ),
      },
      {
        key: 'signup',
        label: (
          <Link to="/signup">
            <FormattedMessage id="signup" />
          </Link>
        ),
      },
    ] : {
      key: 'dashboard',
      label: (
        <Link to={dashboardUrl}>
          <FormattedMessage id="dashboard" />
        </Link>
      ),
    },
    {
      key: 'settings',
      label: intl.formatMessage({ id: 'language' }),
      icon: <SettingOutlined />,
      onClick: context.toggleLocale,
    }
  ].flat(); // Flatten to handle the ternary structure
  const [current, setCurrent] = useState('home'); 
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
};

export default Navigation;
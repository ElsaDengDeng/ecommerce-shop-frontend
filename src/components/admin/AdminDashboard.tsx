import React from 'react';

import Layout from '../core/Layout';
import { FormattedMessage, useIntl } from 'react-intl';
import { Col, Row, Typography, Descriptions, Menu, MenuProps } from 'antd';
import { DescriptionsProps } from 'antd/lib';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../app/models/auth';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const Dashboard = () => {
  const intl = useIntl();
  const {
    user: { name, email },
  } = isAuth() as Jwt;
  type MenuItem = Required<MenuProps>['items'][number];
  const leftItems: MenuItem[] = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: (
        <Link to="/create/category">
          <FormattedMessage id="addCategory" />
        </Link>
      ),
    },
    {
      key: '２',
      icon: <ContainerOutlined />,
      label: (
        <Link to="/create/product">
          <FormattedMessage id="addProduct" />
        </Link>
      ),
    },
    {
      key: '3',
      icon: <DesktopOutlined />,
      label: (
        <Link to="/admin/orders">
          <FormattedMessage id="orderManagement" />
        </Link>
      ),
    },
  ];
  const adminLinks = () => (
    <Menu
      defaultSelectedKeys={['1']}
      items={leftItems}
    />
  );

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'username' }),
      children: <span>{name}</span>,
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'email' }),
      children: <span>{email}</span>,
    },
    {
      key: '3',
      label: intl.formatMessage({ id: 'role' }),
      children: <FormattedMessage id="admin" />,
    },
  ];
  const adminInfo = () => (
    <Descriptions
      bordered
      title={intl.formatMessage({ id: 'adminUserinfo' })}
      items={items}
    />
  );

  return (
    <Layout title={intl.formatMessage({ id: 'adminDashboard' })} subTitle="">
      <Row>
        <Col span="4">{adminLinks()}</Col>
        <Col span="20">{adminInfo()}</Col>
      </Row>
    </Layout>
  );
};

export default Dashboard;

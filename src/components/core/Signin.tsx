import React, { useState } from 'react';
import Layout from './Layout';
import { Button, Form, Input, Result } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SignPayload, selectAuth } from '../../features/auth/authSlice';
import { fetchSignin } from '../../features/auth/authAPI';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../app/models/auth';
import { Redirect } from 'react-router-dom';

const Signin = () => {
  const intl = useIntl();
  // 获取 dispatch 方法
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  // 注册表单提交
  const onFinish = (payload: SignPayload) => {
    // 发送注册请求
    dispatch(fetchSignin(payload));
  };
  // 1 获取登录结果
  const auth = useAppSelector(selectAuth);
  // 2 登录失败
  const showError = () => {
    if (auth.signin.loaded && !auth.signin.success) {
      return (
        <Result
          status="warning"
          title={intl.formatMessage({ id: 'signinFail' })}
          subTitle={auth.signin.message}
        ></Result>
      );
    }
  };
  // 3 登录成功 根据角色跳转到对应的管理页面
  const redirectToDashboard = () => {
    const auth = isAuth();
    if (auth) {
      const { user } = auth as Jwt;
      console.log(user);
      if (user.role === 0) {
        // 注册用户
        return <Redirect to="/user/dashboard"  />;
      } else {
        // 管理员
        return <Redirect to="/admin/dashboard" />;
      }
    }
  };

  // 4 处理导航链接 已登录 隐藏 [登录， 注册]显示 [dashboard]

  const signinForm = () => (
    <Form onFinish={onFinish}>
      <Form.Item label={intl.formatMessage({ id: 'email' })} name="email">
        <Input />
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'password' })} name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="login" />
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout
      title={intl.formatMessage({ id: 'login' })}
      subTitle=""
    >
      {showError()}
      {redirectToDashboard()}
      {signinForm()}
    </Layout>
  );
};

export default Signin;

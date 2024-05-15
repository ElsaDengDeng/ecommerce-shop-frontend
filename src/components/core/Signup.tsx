import React, { useEffect } from 'react';
import Layout from './Layout';
import { Button, Form, Input, Result } from 'antd';
import {
  SignPayload,
  resetSignup,
  selectAuth,
} from '../../features/auth/authSlice';
import { fetchSignup } from '../../features/auth/authAPI';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const Signup = () => {
  const intl = useIntl();
  // 获取 dispatch 方法
  const dispatch = useAppDispatch();
  // 获取注册结果
  const auth = useAppSelector(selectAuth);
  console.log("auth---------------", auth)

  const [form] = Form.useForm();
  // 注册表单提交
  const onFinish = (payload: SignPayload) => {
    // 发送注册请求
    dispatch(fetchSignup(payload));
  };
  // 1. 注册成功 清空表单
  useEffect(() => {
    if (auth.signup.loaded && auth.signup.success) {
      form.resetFields();
    }
  }, [auth]);
  // 2. 注册成功 显示成功的提示信息
  const showSuccess = () => {
    if (auth.signup.loaded && auth.signup.success) {
      return (
        <Result
          status="success"
          title={intl.formatMessage({ id: 'signupSuccess' })}
          extra={[
            <Button type="primary">
              <Link to="/signin">
                <FormattedMessage id="signin" />
              </Link>
            </Button>,
          ]}
        ></Result>
      );
    }
  };
  // 3. 注册失败 显示失败的提示信息
  const showError = () => {
    if (auth.signup.loaded && !auth.signup.success) {
      return (
        <Result
          status="warning"
          title={intl.formatMessage({ id: 'signupFail' })}
          subTitle={auth.signup.message}
        ></Result>
      );
    }
  };
  // 4. 离开页面之前 重置状态
  useEffect(() => {
    return () => {
      dispatch(resetSignup())
    };
  }, []);

  const signupForm = () => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item label={intl.formatMessage({ id: 'username' })} name="name">
        <Input />
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'password' })} name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'email' })} name="email">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="signin" />
        </Button>
      </Form.Item>
    </Form>
  );
  return (
    <Layout
      title={intl.formatMessage({ id: 'signup' })}
      subTitle={intl.formatMessage({ id: 'signupSubTitle' })}
    >
      {showSuccess()}
      {showError()}
      {signupForm()}
    </Layout>
  );
};

export default Signup;

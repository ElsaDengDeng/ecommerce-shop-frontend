import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Form, Input, message } from 'antd';
import { Link } from "react-router-dom";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../app/models/auth";
import axios from "axios";
import { API } from "../../config";

const AddCategory = () => {
  const intl = useIntl(); // 获取翻译钩子
  const [name, setName] = useState<string>("")
  const { user, token } = isAuth() as Jwt
  const [form] = Form.useForm();
  useEffect(() => {
    async function addCategory() {
      try {
        let response = await axios.post<{name: string}>(
          `${API}/category/create/${user._id}`,
          {
            name: name
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        message.success(`[${response.data.name}] ${intl.formatMessage({ id: 'categoryAddSuccess' })}`)
        form.resetFields(); // 提交成功清空input框内容
      } catch(error:any) {
        message.error(error.response.data.error)
      }
    }
    if (name) {
      addCategory()
    }
  }, [name])
  function onFinish(values: {name: string }): void {
    console.log(values)
    setName(values.name)
  }

  return (
    <Layout title={intl.formatMessage({ id: 'addCategory' })} subTitle="">
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'categoryName' })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'categoryName' })}
        >
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="addCategory" />
          </Button>
        </Form.Item>
      </Form>
      <Button>
        <Link to="/admin/dashboard">
          <FormattedMessage id="toDashboard" />
        </Link>
      </Button>
    </Layout>
  );
};

export default AddCategory;

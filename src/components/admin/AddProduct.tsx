import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategory } from '../../features/category/categorySlice';
import { fetchGetCategory } from '../../features/category/categoryAPI';
import { RcFile } from "antd/es/upload";
import axios from "axios";
import { API } from "../../config";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../app/models/auth";

const AddProduct = () => {
  const intl = useIntl(); // 获取翻译钩子
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<RcFile>()
  const category = useAppSelector(selectCategory);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(fetchGetCategory());
  }, []);
  const { user, token} = isAuth() as Jwt
  function onFinish(product: any ) {
    const formData = new FormData()
    console.log(product)
    for(let attr in product) {
      formData.set(attr, product[attr])
    }
    if(typeof file !== undefined) {
      formData.set("photo", file as Blob)
    }

    axios.post(`${API}/product/create/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(
      () => {
        form.resetFields(); // 提交成功清空input框内容
        message.success("Product Add Success")
      },
      () => {
        message.success("Product Add Failed")
      }
    )
  }
  

  const addProductForm = () => {
    const props = {
      accept: "image/*",
      beforeUpload: function (file: RcFile) {
        console.log(file)
        setFile(file)
        return false
      },
    };
    return (
      <Form form={form}  onFinish={onFinish} initialValues={{ category: '' }}>
        <Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>
              <FormattedMessage id="productsImg" />
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'productName' })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={intl.formatMessage({ id: 'productDescription' })}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label={intl.formatMessage({ id: 'price' })}>
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label={intl.formatMessage({ id: 'productCategory' })}
        >
          <Select>
            <Select.Option value="">
              <FormattedMessage id="selectCategory" />
            </Select.Option>
            {category.result.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="quantity"
          label={intl.formatMessage({ id: 'productNum' })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="shipping"
          label={intl.formatMessage({ id: 'isTransportation' })}
        >
          <Select>
            <Select.Option value="1">
              <FormattedMessage id="yes" />
            </Select.Option>
            <Select.Option value="0">
              <FormattedMessage id="no" />
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="addProduct" />
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout title={intl.formatMessage({ id: 'addProduct' })} subTitle="">
      {addProductForm()}
    </Layout>
  );
};

export default AddProduct;

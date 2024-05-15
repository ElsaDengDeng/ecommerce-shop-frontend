import React, { useEffect } from 'react';
import Layout from './Layout';
import Search from './Search';
import { Col, Row } from 'antd';
import ProductItem from './ProductItem';
import { Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProduct, selectProduct } from '../../features/product/productSlice';
import { fetchGetProduct } from '../../features/product/productAPI';
import { FormattedMessage, useIntl } from 'react-intl';
const { Title, Paragraph } = Typography;

const Home = () => {
  const intl = useIntl(); // 获取翻译钩子
  // 获取注册结果
  const { createAt, sold } = useAppSelector(selectProduct);
  // 获取 dispatch 方法
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchGetProduct({
        sortBy: 'createAt',
      })
    );
    dispatch(
      fetchGetProduct({
        sortBy: 'sold',
      })
    );
  }, []);
  return (
    <div>
      <Layout title={intl.formatMessage({ id: 'systemName' })} subTitle="">
        <Search />
        <Title level={5}>
          <FormattedMessage id="latestShelves" />
        </Title>
        <Row gutter={[16, 16]}>
          {createAt.products.map((item) => (
            <Col span="6">
              <ProductItem product={item}></ProductItem>
            </Col>
          ))}
        </Row>
        <Title level={5}>
          <FormattedMessage id="mostPopular" />
        </Title>
        <Row gutter={[16, 16]}>
          {sold.products.map((item) => (
            <Col span="6">
              <ProductItem product={item}></ProductItem>
            </Col>
          ))}
        </Row>
      </Layout>
    </div>
  );
};

export default Home;

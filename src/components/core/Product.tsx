import React, { useEffect } from 'react';
import Layout from './Layout';
import { Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProduct } from "../../features/product/productSlice";
import { fetchGetProductById } from "../../features/product/productAPI";
import ProductItem from "./ProductItem";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

const Product = () => {
  const intl = useIntl(); // 获取翻译钩子
  const dispatch = useAppDispatch();
  const { product } = useAppSelector(selectProduct)
  const { productId } = useParams<{ productId: string }>();
  console.log("productId-----", productId)
  useEffect(() => {
    dispatch(fetchGetProductById({
      productId: productId as string
    }))
  }, [])
  return (
    <Layout title={intl.formatMessage({ id: 'systemName' })} subTitle="">
      <Row gutter={36}>
        <Col span="18">
          <ProductItem product={product.result} showCartBtn={false} showViewProduct={false}></ProductItem>
        </Col>
        <Col span="6"></Col>
      </Row>
    </Layout>
  );
};

export default Product;

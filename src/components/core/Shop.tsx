import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Button, Col, Empty, Row, Space } from 'antd';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFilterProduct } from '../../features/product/productAPI';
import { selectProduct } from '../../features/product/productSlice';
import ProductItem from './ProductItem';
import { useIntl } from "react-intl";

const Shop = () => {
  const intl = useIntl(); // 获取翻译钩子
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const [skip, setSkip] = useState<number>(0);

  // 指定存储状态的类型 <{a: string[]}>
  // <>({a:[] }) 指定参数默认值
  const [myFilters, setMyFilters] = useState<{
    category: string[];
    price: number[];
  }>({ category: [], price: [] });
  useEffect(() => {
    setSkip(0)
  }, [myFilters])
  // 第二个参数为 myFilters, 当它发生变化时， 执行一次
  useEffect(() => {
    dispatch(
      fetchFilterProduct({
        filters: myFilters,
        skip: skip,
      })
    );
  }, [myFilters, skip]);

  const filterDom = () => (
    <>
      <Space size="middle" direction="vertical">
        <CheckBox
          handleFilter={(filters: string[]) => {
            setMyFilters({ ...myFilters, category: filters });
          }}
        />
        <RadioBox
          handleFilter={(filters: number[]) => {
            setMyFilters({ ...myFilters, price: filters });
          }}
        />
      </Space>
    </>
  );
  const productDom = () => (
    <Row gutter={[16, 16]}>
      {product.filter.result.data.map((item) => (
        <Col key={item._id} span="6">
          <ProductItem product={item}></ProductItem>
        </Col>
      ))}
    </Row>
  );
  const loadMoreButton = () => {
    return (
      <Row>
        {product.filter.result.size >= 4 && (
          <Button onClick={loadMore}></Button>
        )}
      </Row>
    );
  };
  const loadMore = () => {
    setSkip(skip + 4);
  };
  const noData = () => {
    return <>
      {product.filter.result.size === 0 && (
        <Empty/>
      )}
    </>
  }
  return (
    <Layout title={intl.formatMessage({ id: 'systemName' })} subTitle="">
      <Row>
        <Col span="4">{filterDom()}</Col>
        <Col span="20">{productDom()}{loadMoreButton()}{noData()}</Col>
      </Row>
    </Layout>
  );
};

export default Shop;

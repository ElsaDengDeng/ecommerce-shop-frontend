import { Button, Col, Divider, Empty, Form, Input, Row, Select } from 'antd';
import ProductItem from './ProductItem';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategory } from '../../features/category/categorySlice';
import { fetchGetCategory } from '../../features/category/categoryAPI';
import { fetchSearchProduct } from '../../features/product/productAPI';
import { selectProduct } from '../../features/product/productSlice';
import { FormattedMessage, useIntl } from 'react-intl';

const Search = () => {
  const intl = useIntl(); // 获取翻译钩子
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const { search } = useAppSelector(selectProduct);
  // `useEffect`在组件挂载完成之后请求 分类数据，
  useEffect(() => {
    dispatch(fetchGetCategory());
  }, []);
  function onFinish(values: { category: string; search: string }): void {
    dispatch(
      fetchSearchProduct({
        category: values.category,
        search: values.search,
      })
    );
  }

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="inline"
        initialValues={{ category: 'All' }}
      >
        <Input.Group compact>
          <Form.Item name="category">
            <Select>
              <Select.Option value="All">
                <FormattedMessage id="productAllCategory" />
              </Select.Option>
              {category.result.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="search">
            <Input
              placeholder={intl.formatMessage({ id: 'searchPlaceholder' })}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">
              <FormattedMessage id="search" />
            </Button>
          </Form.Item>
        </Input.Group>
      </Form>
      <Divider />
      <Row gutter={[16, 16]}>
        {search?.map((item) => (
          <Col span="6">
            <ProductItem product={item}></ProductItem>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Search;

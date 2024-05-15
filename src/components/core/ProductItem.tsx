import React, { FC } from 'react';
import { Button, Card, Col, Row, Image } from 'antd';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import { Product } from '../../app/models/Product';
import { API } from '../../config';
import moment from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
import { addItem } from '../../helpers/cart';
import { useAppDispatch } from '../../app/hooks';
import { push } from 'connected-react-router';

const { Title, Paragraph } = Typography;

interface Props {
  product: Product;
  showViewProduct?: boolean;
  showCartBtn?: boolean;
}
const ProductItem: FC<Props> = ({ product, showViewProduct, showCartBtn }) => {
  const dispatch = useAppDispatch()
  const addToCart = () => {
    addItem(product, () => {
      dispatch(push("/cart") as any)
    })
  }
  const showButtons = () => {
    let buttonArray = [];
    if (showViewProduct)
      buttonArray.push(
        <Button type="link">
          <Link to={`/product/${product._id}`}>
            <FormattedMessage id="productDetailsBtn" />
          </Link>
        </Button>
      );
    if (showCartBtn) {
      buttonArray.push(
        <Button type="link" onClick={addToCart}>
            <FormattedMessage id="addToCart" />
        </Button>
      )
    }
    return buttonArray
  };
  return (
    <Card
      cover={
        <Image src={`${API}/product/photo/${product._id}`} alt={product.name} />
      }
      actions={showButtons()}
    >
      <Title level={5}>
        <Paragraph ellipsis={{ rows: 2 }}>{product.name}</Paragraph>
      </Title>
      <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
      <Row>
        <Col span="12">
          <FormattedMessage id="salesVolume" />: {product.sold}
        </Col>
        <Col span="12" style={{ textAlign: 'right' }}>
          <FormattedMessage id="price" />: {product.price}
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormattedMessage id="timeShelves" />:{' '}
          {moment(product.createdAt).format('YYYY-MM-DD')}
        </Col>
        <Col span="12" style={{ textAlign: 'right' }}>
          <FormattedMessage id="productCategory" />: {product.category.name}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductItem;

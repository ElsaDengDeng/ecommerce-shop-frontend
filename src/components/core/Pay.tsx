import React, { FC } from "react";
import { isAuth } from "../../helpers/auth";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { CartItem } from "../../helpers/cart";
import axios from "axios";
import { API } from "../../config";
import { Jwt } from "../../app/models/auth";

interface Props {
  totalPrice: number;
  address: string;
  cart: CartItem[];
}
const Pay: FC<Props> = ({ totalPrice, address, cart }) => {
  const getPayUrl = () => {
    axios
      .post(`${API}/alipay`, {
        totalAmount: totalPrice,
        subject: "",
        body: "",
        products: cart.map((product) => ({
          count: product.count,
          product: product._id,
        })),
        address: address,
        userId: (isAuth() as Jwt).user._id,
      })
      .then((response) => {
        console.log(response);
        window.location.href = response.data.result
      });
  };
  const showButtons = () => {
    return isAuth() ? (
      <Button onClick={getPayUrl}>提交订单</Button>
    ) : (
      <Button>
        <Link to="/signin">登录</Link>
      </Button>
    );
  };
  return <>{showButtons()}</>;
};

export default Pay;

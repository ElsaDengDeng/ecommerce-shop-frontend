import React, { ChangeEvent, FC, useState } from "react";
import { CartItem, deleteItem, updateItem } from "../../helpers/cart";
import { Button, Image, Input } from "antd";
import { API } from "../../config";
interface Props {
  product: CartItem
  setCart: (arg: CartItem[]) => void
}
const CartItemFc: FC<Props> = ({ product, setCart }) => {
   const [count, setCount] = useState<number>(product.count)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(event.target.value)
    // updateItem() 把本地数据同步了
    // setCart() 把父组件数据同步了

    setCart(updateItem(product._id, count))
    // 把DOM数据也同步了
    setCount(count)
  }
  return (
    <tr className="ant-table-row">
      <td className="ant-table-cell">
        <Image width={120} src={`${API}/product/photo/${product._id}`} />
      </td>
      <td className="ant-table-cell">{product.name}</td>
      <td className="ant-table-cell">{product.price}</td>
      <td className="ant-table-cell">{product.category?.name}</td>
      <td className="ant-table-cell">
        <Input type="number" value={count} onChange={handleChange} />
      </td>
      <td className="ant-table-cell">
        <Button
          onClick={() => setCart(deleteItem(product._id))}
          danger
          type="primary"
        >
          删除
        </Button>
      </td>
    </tr>
  );
};

export default CartItemFc;
function setCart(arg0: CartItem[]) {
    throw new Error("Function not implemented.");
}


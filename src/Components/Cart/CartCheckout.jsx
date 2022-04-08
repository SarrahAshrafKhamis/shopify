import { useEffect, useRef, useState } from "react";
import { Card, Divider, Spin } from "antd";
import UsersService from "../../Services/usersService";

const { Meta } = Card;

const CartCheckout = ({ userId, addOrderHandler }) => {
  const [user, setUser] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsNumber, setItemsNumber] = useState(0);
  const numberRef = useRef(0);
  const priceRef = useRef(0);
  const addOrder = (_order) => {
    addOrderHandler(_order, user);
  };

  useEffect(() => {
    UsersService.getById(userId).then((res) => {
      setUser(res.data);
      let number = 0;
      res.data.cart.forEach((v) => (number += v.quantity));
      setItemsNumber(number);
      numberRef.current = number;
      let price = 0;
      res.data.cart.forEach((v) => (price += v.product.price * v.quantity));
      setTotalPrice(price);
      priceRef.current = price;
    });
  }, []);
  useEffect(() => {
    return () => {
      console.log("unmount");
      let order = {
        itemsNumber: numberRef.current,
        totalPrice: priceRef.current,
        date: new Date(Date.now()).toLocaleDateString(),
        isDelivered: false,
      };
      addOrder(order);
    };
  }, []);
  if (user.cart)
    return (
      <Card>
        <Card type="inner" title="Payment">
          <Meta title={"Number of items"} description={itemsNumber} />
          <Divider plain />
          <Meta title={"Total price"} description={totalPrice} />
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Contact">
          <Meta title={"Address"} description={user.address} />
          <Divider plain />
          <Meta title={"Mobile"} description={user.mobile} />
        </Card>
      </Card>
    );
  else return <Spin size="large" />;
};

export default CartCheckout;

import { useEffect, useState } from "react";
import { List, Space, InputNumber, Spin } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const CartItems = ({ user, updateUserHandler }) => {
  let [items, setItems] = useState([]);
  useEffect(() => {
    if (user.cart) {
      setItems(user.cart);
    }
  }, [user]);

  const updateUser = () => {
    let _user = user;
    _user.cart = items;
    updateUserHandler(_user);
  };

  if (items.length > 0)
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item
            key={item.product.name}
            actions={[
              <Space>
                <b>Quantity: </b>
                <InputNumber
                  defaultValue={item.quantity}
                  onChange={(val) => {
                    let _items = items;
                    _items[index].quantity = val;
                    setItems(_items);
                  }}
                  onBlur={() => updateUser()}
                />
              </Space>,
              <Space>
                <b>Price: </b>
                <InputNumber value={item.product.price} disabled />
              </Space>,
              <Space>
                <DollarOutlined style={{ fontSize: "20px", color: "green" }} />
                <InputNumber
                  value={item.quantity * item.product.price}
                  disabled
                />
              </Space>,
            ]}
            extra={
              <img
                width={200}
                height={200}
                alt={item.product.description}
                src={item.product.image}
              />
            }
          >
            <List.Item.Meta
              title={item.product.name}
              description={item.product.description}
            />
          </List.Item>
        )}
      />
    );
  else return <Spin size="large" />;
};

export default CartItems;

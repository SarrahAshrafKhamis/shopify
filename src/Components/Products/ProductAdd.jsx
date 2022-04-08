import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, InputNumber, Input, Button, Divider } from "antd";
import ProructsService from "../../Services/ProductsService";

const { Meta } = Card;

const ProductAdd = () => {
  let navigate = useNavigate();
  let [product, setProduct] = useState({
    image: `/images/${Math.ceil(Math.random() * 5)}.jpg`,
  });

  let changeValue = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card
      hoverable
      style={{
        margin: "auto",
        width: 300,
        borderRadius: "25px",
        overflow: "hidden",
      }}
      cover={<img alt={"new prod description"} src={"/images/empty.jpg"} />}
      actions={[
        <Button
          shape="round"
          onClick={() => {
            ProructsService.add(product).then(() => {
              navigate("/products");
            });
          }}
        >
          Save
        </Button>,
        <Button shape="round" onClick={() => navigate("/products")} danger>
          Cancel
        </Button>,
      ]}
    >
      <Meta
        title={"Id"}
        description={
          <Input value={product.id} name="id" onChange={changeValue} />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Name"}
        description={
          <Input value={product.name} name="name" onChange={changeValue} />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Description"}
        description={
          <Input
            value={product.description}
            name="description"
            onChange={changeValue}
          />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Price"}
        description={
          <InputNumber
            min={1}
            value={product.price}
            name="price"
            onChange={(val) =>
              setProduct((prevState) => ({
                ...prevState,
                price: val,
              }))
            }
          />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Quantity"}
        description={
          <InputNumber
            min={1}
            value={product.quantity}
            name="quantity"
            onChange={(val) =>
              setProduct((prevState) => ({
                ...prevState,
                quantity: val,
              }))
            }
          />
        }
      />
    </Card>
  );
};

export default ProductAdd;

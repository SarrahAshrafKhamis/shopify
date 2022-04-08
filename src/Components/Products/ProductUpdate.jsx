import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Skeleton, Card, InputNumber, Input, Button, Divider } from "antd";
import ProructsService from "../../Services/ProductsService";

const { Meta } = Card;

const ProductUpdate = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [product, setProduct] = useState({});

  useEffect(() => {
    ProructsService.getById(params.id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [params.id]);

  let handle = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Card
        style={{
          margin: "auto",
          width: 400,
          borderRadius: "25px",
          overflow: "hidden",
        }}
        actions={[]}
      >
        <Skeleton loading={loading} avatar active />
      </Card>
    );
  }
  return (
    <Card
      hoverable
      style={{
        margin: "auto",
        width: 400,
        borderRadius: "25px",
        overflow: "hidden",
      }}
      cover={<img alt={product.description} src={product.image} />}
      actions={[
        <Button
          shape="round"
          onClick={() => {
            ProructsService.update(product).then(() => {
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
        title={"Name"}
        description={
          <Input value={product.name} name="name" onChange={handle} />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Description"}
        description={
          <Input
            value={product.description}
            name="description"
            onChange={handle}
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

export default ProductUpdate;

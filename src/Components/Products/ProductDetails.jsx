import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Divider, Skeleton, Button } from "antd";
import ProructsService from "../../Services/ProductsService";

const { Meta } = Card;

const ProductDetails = () => {
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);
  let params = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    ProructsService.getById(params.id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [params.id]);

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
        <Button shape="round" onClick={() => navigate("/products")}>
          Back to List
        </Button>,
      ]}
    >
      <Meta title={product.name} description={product.description} />
      <Divider orientation="center" plain>
        Details
      </Divider>
      <Meta title={"Price"} description={product.price} />
      <Meta title={"Quantity"} description={product.quantity} />
    </Card>
  );
};

export default ProductDetails;

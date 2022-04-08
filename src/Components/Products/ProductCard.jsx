import { useNavigate } from "react-router-dom";
import { Card, Tooltip, Popconfirm, message } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import UsersService from "../../Services/usersService";

const userId = 1;

const { Meta } = Card;

const ProductCard = ({ product, deleteHandler }) => {
  let navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        width: 250,
        margin: "20px",
        borderRadius: "25px",
        overflow: "hidden",
      }}
      cover={<img alt={product.description} src={product.image} />}
      actions={[
        <Tooltip placement="bottom" title="Edit">
          <EditOutlined
            style={{ color: "orange" }}
            key="edit"
            onClick={() =>
              navigate(`/products/update/${product.id}`, {
                state: {
                  product: product,
                },
              })
            }
          />
        </Tooltip>,
        <Tooltip placement="bottom" title="Delete">
          <Popconfirm
            placement="bottom"
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteHandler(product.id)}
          >
            <DeleteOutlined key="delete" style={{ color: "red" }} />
          </Popconfirm>
        </Tooltip>,
        <Tooltip placement="bottom" title="Details">
          <SearchOutlined
            style={{ color: "blue" }}
            key="ellipsis"
            onClick={() => navigate(`/products/details/${product.id}`)}
          />
        </Tooltip>,
        <Tooltip placement="bottom" title="Add to cart">
          <ShoppingCartOutlined
            key="ellipsis"
            style={{ color: "green" }}
            onClick={() => {
              UsersService.getById(userId).then((res) => {
                let _user = res.data;
                _user.cart.push({
                  product: { ...product },
                  quantity: 1,
                });
                UsersService.update(_user).then((res) => {
                  message.success("Added to Cart", 1);
                });
              });
            }}
          />
        </Tooltip>,
      ]}
    >
      <Meta title={product.name} description={product.description} />
    </Card>
  );
};

export default ProductCard;

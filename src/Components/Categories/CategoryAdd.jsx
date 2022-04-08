import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Input, Button, Divider } from "antd";
import CategoriesService from "../../Services/CategoriesService";

const { Meta } = Card;

const CategoryAdd = () => {
  let navigate = useNavigate();
  let [category, setCategory] = useState({});

  let changeValue = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
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
      actions={[
        <Button
          shape="round"
          onClick={() => {
            CategoriesService.add(category).then(() => {
              navigate("/categories");
            });
          }}
        >
          Save
        </Button>,
        <Button shape="round" onClick={() => navigate("/categories")} danger>
          Cancel
        </Button>,
      ]}
    >
      <Meta
        title={"Id"}
        description={
          <Input value={category.id} name="id" onChange={changeValue} />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Name"}
        description={
          <Input value={category.name} name="name" onChange={changeValue} />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Description"}
        description={
          <Input
            value={category.description}
            name="description"
            onChange={changeValue}
          />
        }
      />
    </Card>
  );
};

export default CategoryAdd;

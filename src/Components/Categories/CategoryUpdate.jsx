import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Skeleton, Card, Input, Button, Divider } from "antd";
import CategoriesService from "../../Services/CategoriesService";

const { Meta } = Card;

const CategoryUpdate = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [category, setCategory] = useState({});

  useEffect(() => {
    CategoriesService.getById(params.id).then((res) => {
      setCategory(res.data);
      setLoading(false);
    });
  }, [params.id]);

  let handle = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
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
      actions={[
        <Button
          shape="round"
          onClick={() => {
            CategoriesService.update(category).then(() => {
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
        title={"Name"}
        description={
          <Input value={category.name} name="name" onChange={handle} />
        }
      />
      <Divider plain></Divider>
      <Meta
        title={"Description"}
        description={
          <Input
            value={category.description}
            name="description"
            onChange={handle}
          />
        }
      />
    </Card>
  );
};

export default CategoryUpdate;

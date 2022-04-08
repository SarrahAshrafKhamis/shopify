import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TagsOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Spin, List, Popconfirm } from "antd";

import CategoriesService from "../../Services/CategoriesService";

const CategoriesList = () => {
  let navigate = useNavigate();
  let [categories, setCategories] = useState([]);

  let reloadCategories = () =>
    CategoriesService.getAll().then((res) => setCategories(res.data));

  useEffect(() => {
    reloadCategories();
  }, []);

  let deleteCategory = (id) => {
    CategoriesService.delete(id).then(() => {
      reloadCategories();
    });
  };

  return categories.length === 0 ? (
    <Spin size="large" />
  ) : (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={categories}
      renderItem={(category) => (
        <List.Item
          actions={[
            <EditFilled
              style={{ cursor: "pointer", fontSize: "18px", color: "orange" }}
              onClick={() => navigate(`/categories/update/${category.id}`)}
            />,
            <Popconfirm
              placement="bottom"
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteCategory(category.id)}
            >
              <DeleteFilled
                style={{ cursor: "pointer", fontSize: "18px", color: "red" }}
              />
            </Popconfirm>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <TagsOutlined style={{ fontSize: "20px", color: "blue" }} />
            }
            title={category.name}
            description={category.description}
          />
        </List.Item>
      )}
    />
  );
};

export default CategoriesList;

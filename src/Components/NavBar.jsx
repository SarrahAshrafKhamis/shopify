import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  ShoppingCartOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  TagsOutlined,
  SearchOutlined,
  HomeOutlined,
  AmazonOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const { SubMenu } = Menu;

const NavBar = () => {
  let navigate = useNavigate();
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo d-flex justify-content-center mt-2">
        <AmazonOutlined
          style={{ fontSize: "34px", color: "white" }}
          onClick={() => navigate("/")}
        />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to={"/"}>Home</Link>
        </Menu.Item>
        <SubMenu key={"products"} title="Products" icon={<SearchOutlined />}>
          <Menu.Item key="productsList" icon={<UnorderedListOutlined />}>
            <Link to={"/products"}>List</Link>
          </Menu.Item>
          <Menu.Item key="productAdd" icon={<PlusCircleOutlined />}>
            <Link to={"/products/add"}>Add</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key={"categories"} title="Categories" icon={<TagsOutlined />}>
          <Menu.Item key="categoriesList" icon={<UnorderedListOutlined />}>
            <Link to={"/categories"}>List</Link>
          </Menu.Item>
          <Menu.Item key="categoriesAdd" icon={<PlusCircleOutlined />}>
            <Link to={"/categories/add"}>Add</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to={"/cart"}>Your Cart</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default NavBar;

import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

const CategoriesComp = () => {
  return (
    <Content style={{ padding: "0 50px" }}>
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Content>
  );
};

export default CategoriesComp;

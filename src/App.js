import "./App.css";

import NavBar from "./Components/NavBar";
import MyFooter from "./Components/Footer";
import AppRouter from "./Components/AppRouter";

import { Layout } from "antd";

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <NavBar />
      <Layout className="site-layout">
        <AppRouter />
        <MyFooter />
      </Layout>
    </Layout>
  );
}

export default App;

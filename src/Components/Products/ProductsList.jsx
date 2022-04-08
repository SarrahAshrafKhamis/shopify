import { useState, useEffect } from "react";
import ProructsService from "../../Services/ProductsService";
import ProductCard from "./ProductCard";
import { Spin } from "antd";

const ProductsList = () => {
  let [products, setProducts] = useState([]);
  let reloadProducts = () =>
    ProructsService.getAll().then((res) => setProducts(res.data));
  useEffect(() => {
    reloadProducts();
  }, []);

  let deleteProduct = (id) => {
    ProructsService.delete(id).then(() => {
      reloadProducts();
    });
  };
  return products.length === 0 ? (
    <Spin size="large" />
  ) : (
    <div className="container-fluid d-flex justify-content-around flex-wrap">
      {products.map((prod, index) => (
        <ProductCard product={prod} key={index} deleteHandler={deleteProduct} />
      ))}
    </div>
  );
};

export default ProductsList;

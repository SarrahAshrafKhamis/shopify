import { Routes, Route } from "react-router-dom";

import Home from "./Home";

import ProductsComp from "./Products/ProductsComp";
import ProductsList from "./Products/ProductsList";
import ProductAdd from "./Products/ProductAdd";
import ProductDetails from "./Products/ProductDetails";
import ProductUpdate from "./Products/ProductUpdate";

import CategoriesComp from "./Categories/CategoriesComp";
import CategoriesList from "./Categories/CategoriesList";
import CategoryAdd from "./Categories/CategoryAdd";
import CategoryUpdate from "./Categories/CategoryUpdate";

import CartComp from "./Cart/CartComp";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsComp />}>
        <Route index element={<ProductsList />} />
        <Route path="add" element={<ProductAdd />} />
        <Route path="details/:id" element={<ProductDetails />} />
        <Route path="update/:id" element={<ProductUpdate />} />
      </Route>
      <Route path="/categories" element={<CategoriesComp />}>
        <Route index element={<CategoriesList />} />
        <Route path="add" element={<CategoryAdd />} />
        <Route path="update/:id" element={<CategoryUpdate />} />
      </Route>
      <Route path="/cart" element={<CartComp />} />
    </Routes>
  );
};

export default AppRouter;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Steps, message, Empty } from "antd";
import CartItems from "./CartItems";
import CartContact from "./CartContact";
import CartCheckout from "./CartCheckout";
import UsersService from "../../Services/usersService";

const { Step } = Steps;

const steps = ["Confirm Items", "Confirm Contact", "Checkout"];

const userId = 1;

const CartComp = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    UsersService.getById(userId).then((res) => {
      setUser(res.data);
    });
  }, []);

  const updateUser = (_user) => {
    UsersService.update(_user).then((res) => {
      setUser(res.data);
    });
  };

  const addOrder = (_order) => {
    let user;
    UsersService.getById(userId).then((res) => {
      user = res.data;
      user.orders.push(_order);
      user.cart = [];
      UsersService.update(user).then((res) => {
        console.log("added", res.data);
      });
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  if (user.cart && user.cart.length > 0)
    return (
      <>
        <Steps
          current={current}
          style={{
            marginTop: "20px",
            padding: "10px",
          }}
        >
          {steps.map((step) => (
            <Step key={step} title={step} />
          ))}
        </Steps>
        <div
          className="steps-content"
          style={{
            minHeight: "200px",
            marginTop: "16px",
            paddingTop: "10px",
            backgroundColor: "#fafafa",
            border: "1px dashed #e9e9e9",
            borderRadius: "2px",
          }}
        >
          {current === 0 && (
            <CartItems user={user} updateUserHandler={updateUser} />
          )}
          {current === 1 && (
            <CartContact user={user} updateUserHandler={updateUser} />
          )}
          {current === 2 && (
            <CartCheckout userId={user.id} addOrderHandler={addOrder} />
          )}
        </div>
        <div className="steps-action" style={{ padding: "10px" }}>
          {current < steps.length - 1 && (
            <button className="btn btn-outline-success" onClick={() => next()}>
              Confirm
            </button>
          )}
          {current === steps.length - 1 && (
            <button
              className="btn btn-success"
              onClick={() => {
                message.success("Checkout complete!", 1, () =>
                  navigate("/products")
                );
              }}
            >
              Done
            </button>
          )}
          {current > 0 && (
            <button
              className="btn btn-outline-danger"
              style={{ margin: "0 8px" }}
              onClick={() => prev()}
            >
              Previous
            </button>
          )}
        </div>
      </>
    );
  else
    return <Empty style={{ marginTop: "50px" }} description="Cart is empty" />;
};

export default CartComp;

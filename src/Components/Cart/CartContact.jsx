import { Card, Input } from "antd";
import { useEffect, useState } from "react";

const CartContact = ({ user, updateUserHandler }) => {
  const [_user, setUser] = useState({});
  useEffect(() => {
    setUser(user);
  }, []);
  const updateUser = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Card title="Contact Information">
      <Card type="inner" title="Address">
        <Input
          value={_user.address}
          name="address"
          onChange={updateUser}
          onBlur={() => updateUserHandler(_user)}
        />
      </Card>
      <Card style={{ marginTop: 16 }} type="inner" title="Contact">
        <div>
          <label style={{ marginBottom: "5px" }}>Email</label>
          <Input
            value={_user.email}
            name="email"
            onChange={updateUser}
            onBlur={() => updateUserHandler(_user)}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <label style={{ marginBottom: "5px" }}>Mobile</label>
          <Input
            value={_user.mobile}
            name="mobile"
            onChange={updateUser}
            onBlur={() => updateUserHandler(_user)}
          />
        </div>
      </Card>
    </Card>
  );
};

export default CartContact;

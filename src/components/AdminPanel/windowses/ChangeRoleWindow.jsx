import React from "react";
import { useSelector } from "react-redux";

export const ChangeRoleWindow = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  const [user, setUser] = React.useState("");
  const [role, setRole] = React.useState("");
  const [shop, setShop] = React.useState("");
  async function changeRole(user, role, shop) {
    await props.contract.methods
      .changeRole(user, role, shop)
      .send({ from: currentAccount, gas: "6721975" });
  }
  return (
    <div>
      <input
        type="text"
        value={user}
        placeholder="Адресс пользователя"
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <input
        type="text"
        value={role}
        placeholder="Роль"
        onChange={(e) => {
          setRole(e.target.value);
        }}
      />
      <input
        type="text"
        value={shop}
        placeholder="Магазин"
        onChange={(e) => {
          setShop(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          changeRole(user, role, shop);
        }}
      >
        Изменить
      </button>
    </div>
  );
};

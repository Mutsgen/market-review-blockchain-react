import React from "react";
import { useSelector } from "react-redux";

export const DeleteShop = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  const [address, setAddress] = React.useState("");
  async function deleteShop(address) {
    await props.contract.methods
      .removeShop(address)
      .send({ from: currentAccount, gas: "6721975" });
  }
  return (
    <div>
      <input
        type="text"
        value={address}
        placeholder="Адресс пользователя"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <button
        onClick={() => {
          deleteShop(address);
        }}
      >
        Изничтожить до атомов(закрыть)
      </button>
    </div>
  );
};

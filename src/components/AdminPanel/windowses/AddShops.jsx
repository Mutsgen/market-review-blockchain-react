import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const AddShops = (props) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector((state) => state.currentAccount);
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function addShop(address, city, password) {
    let bytesPass = await props.web3.utils.soliditySha3({
      type: "string",
      value: password,
    });
    await props.contract.methods
      .createNewShop(address, city, bytesPass)
      .send({ from: currentAccount, gas: "6721975" });

    const shopsArr = await props.contract.methods
      .showShops()
      .call({ from: "0x0000000000000000000000000000000000000000" });
    dispatch({ type: "SET_SHOPS", payload: shopsArr });
  }
  return (
    <div>
      <input
        type="text"
        value={address}
        placeholder="Адресс"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <input
        type="text"
        value={city}
        placeholder="Город"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <input
        type="text"
        value={password}
        placeholder="Пароль"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addShop(address, city, password);
        }}
      >
        Да прибудет новый шоп
      </button>
    </div>
  );
};

import React from "react";
import { useSelector } from "react-redux";

export const AddAdmin = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  const [user, setUser] = React.useState("");
  async function addAdmin(address) {
    const Info = await props.contract.methods
      .users(address)
      .call({ from: currentAccount });
    await props.contract.methods
      .changeRole(address, 2, Info[3])
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
      <button
        onClick={() => {
          addAdmin(user);
        }}
      >
        Возвысить в админы
      </button>
    </div>
  );
};

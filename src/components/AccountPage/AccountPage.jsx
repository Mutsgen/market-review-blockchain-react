import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AdminPanel from "../AdminPanel/AdminPanel";
import { BuyerShops } from "../BuyerShops/BuyerShops";
import styles from "./AccountPage.module.css";

export default function AccountPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentRole, swapRole] = useState(0);
  const realRole = useSelector((state) => state.role);
  const currentAccount = useSelector((state) => state.currentAccount);
  const balance = useSelector((state) => state.balance);
  const [shopInput, setShopInput] = useState("");
  if (currentRole === 0) {
    async function updateRole() {
      const Info = await props.contract.methods
        .users(currentAccount)
        .call({ from: currentAccount });
      dispatch({ type: "SET_ACTIVE_ROLE", payload: Info[2] });
      dispatch({ type: "SET_ROLE", payload: Info[1] });
      swapRole(Info[2]);
    }
    updateRole();
  }
  console.log(currentRole);

  const addRequest = async (shop, role) => {
    await props.contract.methods
      .requestToChangeRole(shop, role)
      .send({ from: currentAccount, gas: "6721975" });
  };

  return (
    <div className={styles.account_page}>
      <h1>
        Your account: <span>{currentAccount}</span>
      </h1>
      <button
        className={styles.logout}
        onClick={async () => {
          navigate("/*");
          dispatch({
            type: "SET_CURRENT_ACCOUNT",
            payload: "0x0000000000000000000000000000000000000000",
          });
          dispatch({ type: "SET_ISLOGIN", payload: false });
          dispatch({ type: "SET_BALANCE", payload: "" });
          dispatch({ type: "SET_ROLE", payload: "" });
          dispatch({
            type: "SET_CURRENT_ACCOUNT",
            payload: "0x0000000000000000000000000000000000000000",
          });
        }}
      >
        Выйти
      </button>

      <h2>
        Your balance: <span>{balance} Eth</span>
      </h2>
      <h2>
        Your active role:{" "}
        <span>
          {currentRole == 0
            ? "Buyer"
            : currentRole == 1
            ? "Seller"
            : currentRole == 2
            ? "Admin"
            : "Shop"}
        </span>
      </h2>
      {realRole !== "0" ? (
        <button
          onClick={async () => {
            await props.contract.methods
              .switchActiveRole()
              .send({ from: currentAccount }, async (error, result) => {
                if (error === null) {
                  const Info = await props.contract.methods
                    .users(currentAccount)
                    .call({ from: currentAccount });
                  dispatch({ type: "SET_ACTIVE_ROLE", payload: Info[2] });
                  swapRole(Info[2]);
                  console.log(currentRole);
                }
              });
          }}
        >
          Сменить роль
        </button>
      ) : null}
      {currentRole === "2" ? (
        <AdminPanel web3={props.web3} contract={props.contract} />
      ) : null}
      {currentRole === "1" && realRole === "1" ? (
        <button
          className={styles.dismiss_button}
          onClick={async () => {
            addRequest(0, 0);
          }}
        >
          Запросить увольнение
        </button>
      ) : null}
      {currentRole === "0" && realRole === "0" ? (
        <div className={styles.to_seller_block}>
          <input
            type="text"
            value={shopInput}
            placeholder="В магазин..."
            onChange={(e) => {
              setShopInput(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              addRequest(shopInput, 1);
            }}
          >
            Запросить повышение в продавцы
          </button>
        </div>
      ) : null}

      {currentRole === "0" || currentRole === "1" ? (
        <BuyerShops web3={props.web3} contract={props.contract} />
      ) : null}
    </div>
  );
}

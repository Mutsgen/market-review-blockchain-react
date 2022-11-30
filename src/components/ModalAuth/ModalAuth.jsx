import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./ModalAuth.module.css";

export default function ModalAuth(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLoginInp] = useState("");
  const [password, setPasswordInp] = useState("");
  const currentAccount = useSelector((state) => state.currentAccount);
  let shopsArr;
  return (
    <div className={styles.wrap}>
      <div className={styles.body}>
        <div className={styles.content}>
          <h1>Вход / Регистрация</h1>
          <input
            className={styles.login_input}
            type="text"
            placeholder="Логин(адресс)"
            value={login}
            onChange={(event) => {
              setLoginInp(event.target.value);
            }}
          />
          <input
            className={styles.password_input}
            type="text"
            placeholder="Пароль"
            value={password}
            onChange={(event) => {
              setPasswordInp(event.target.value);
            }}
          />
          <button
            className={styles.login}
            onClick={async () => {
              let bytesPass = await props.web3.utils.soliditySha3({
                type: "string",
                value: password,
              });
              console.log(props.contract);
              let isLogin = false;
              const updateShops = async () => {
                const shops = await props.contract.methods
                  .showShops()
                  .call({ from: currentAccount });
                dispatch({ type: "SET_SHOPS", payload: shops });
                shopsArr = shops;
              };
              await updateShops();
              console.log(shopsArr);
              try {
                isLogin = await props.contract.methods
                  .login(bytesPass)
                  .call({ from: login }, (error, result) => {
                    console.log(result);
                    console.log(error);
                  });
                if (isLogin) {
                  dispatch({ type: "SET_CURRENT_ACCOUNT", payload: login });
                  dispatch({ type: "SET_ISLOGIN", payload: true });

                  const Info = await props.contract.methods
                    .users(login)
                    .call({ from: login });
                  console.log(Info);

                  dispatch({
                    type: "SET_ACTIVE_ROLE",
                    payload: Info.activeRole,
                  });
                  dispatch({
                    type: "SET_ROLE",
                    payload: Info.role,
                  });
                  dispatch({
                    type: "SET_CURRENT_SHOP",
                    payload: Info.shop,
                  });
                  setLoginInp("");
                  setPasswordInp("");
                  navigate("/profile");
                }
                if (!isLogin) {
                  setPasswordInp("");
                  alert("something wrong");
                }
              } catch {
                console.log(shopsArr);
                for (let i = 0; i < shopsArr.length; i++) {
                  const shop = shopsArr[i];
                  if (login != shop[0]) continue;
                  if (bytesPass == shop[1]) {
                    dispatch({ type: "SET_ACTIVE_ROLE", payload: "10" });
                    setLoginInp("");
                    setPasswordInp("");
                    navigate("/profileShop/*");
                  }
                }
              }
            }}
          >
            Войти
          </button>
          <button
            className={styles.registration}
            onClick={async () => {
              let bytesPass = await props.web3.utils.soliditySha3({
                type: "string",
                value: password,
              });
              try {
                await props.contract.methods
                  .registration(bytesPass)
                  .send({ from: login }, (error, result) => {
                    console.log(result);
                    console.log(error);
                    if (!error) {
                      alert("You succesfully registered");
                      setPasswordInp("");
                    }
                  });
              } catch (error) {
                if (error.message.includes("account already registered")) {
                  return alert("account already registered");
                }
                alert("something was wrong");
              }
            }}
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AddAdmin } from "./windowses/AddAdmin";
import { AddShops } from "./windowses/AddShops";
import { ChangeRoleWindow } from "./windowses/ChangeRoleWindow";
import { DeleteShop } from "./windowses/DeleteShop";
import { RoleRequests } from "./windowses/RoleRequests";
import styles from "./AdminPanel.module.css";

export default function AdminPanel(props) {
  const navigate = useNavigate();
  const currentAccount = useSelector((state) => state.currentAccount);
  const isLogin = useSelector((state) => state.isLogin);
  const [activeWindow, setActiveWindow] = useState("null");
  if (!isLogin) {
    return navigate("/*");
  }

  function swapWindow() {
    switch (activeWindow) {
      case "none":
        return null;
      case "changeRole":
        return <ChangeRoleWindow web3={props.web3} contract={props.contract} />;
      case "roleRequests":
        return <RoleRequests web3={props.web3} contract={props.contract} />;
      case "addAdmin":
        return <AddAdmin web3={props.web3} contract={props.contract} />;
      case "addShop":
        return <AddShops web3={props.web3} contract={props.contract} />;
      case "deleteShop":
        return <DeleteShop web3={props.web3} contract={props.contract} />;

      default:
        return null;
    }
  }

  return (
    <div className={styles.admin_panel}>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            activeWindow != "changeRole"
              ? setActiveWindow("changeRole")
              : setActiveWindow("null");
          }}
        >
          Change Role
        </button>
        <button
          onClick={() => {
            activeWindow != "roleRequests"
              ? setActiveWindow("roleRequests")
              : setActiveWindow("null");
          }}
        >
          Change Role on Reques
        </button>
        <button
          onClick={() => {
            activeWindow != "addAdmin"
              ? setActiveWindow("addAdmin")
              : setActiveWindow("null");
          }}
        >
          Add Admin
        </button>
        <button
          onClick={() => {
            activeWindow != "addShop"
              ? setActiveWindow("addShop")
              : setActiveWindow("null");
          }}
        >
          Add Shop
        </button>
        <button
          onClick={() => {
            activeWindow != "deleteShop"
              ? setActiveWindow("deleteShop")
              : setActiveWindow("null");
          }}
        >
          Delete Shop
        </button>
      </div>
      <div className={styles.current_window}>{swapWindow()}</div>
    </div>
  );
}

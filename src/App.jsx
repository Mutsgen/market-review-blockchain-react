import Web3 from "web3";
import { abi } from "./Abi";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import AccountPage from "./components/AccountPage/AccountPage";
import ModalAuth from "./components/ModalAuth/ModalAuth";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ShopPage } from "./components/ShopPage/ShopPage";

const contractAddress = "0x33927e0C61B0eac519491Fa099B971978E00E065";

function App() {
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState();
  const [CI, setCI] = useState();

  const currentAccount = useSelector((state) => state.currentAccount);
  const balance = useSelector((state) => state.balance);

  const accounts = useSelector((state) => state.accounts);
  const shops = useSelector((state) => state.shops);
  const DataLoader = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    setWeb3(web3);

    const CI = new web3.eth.Contract(abi, contractAddress);
    setCI(CI);
    console.log(web3);
    console.log(CI);
    const result = await web3.eth.getAccounts();
    for (let i = 0; i < result.length; i++) {
      const acc = result[i];
      await web3.eth.personal.unlockAccount(acc, "", 0);
    }
    dispatch({ type: "SET_ACCOUNTS", payload: result });

    const shopsArr = await CI.methods
      .showShops()
      .call({ from: "0x0000000000000000000000000000000000000000" });
    dispatch({ type: "SET_SHOPS", payload: shopsArr });
    console.log(shopsArr);

    if (
      currentAccount !== "0x0000000000000000000000000000000000000000" &&
      web3 !== undefined
    ) {
      async function updateBalance() {
        const balance = web3.utils.fromWei(
          await web3.eth.getBalance(currentAccount),
          "ether"
        );
        dispatch({ type: "SET_BALANCE", payload: balance });
      }
      updateBalance();
    }
  };
  useEffect(() => {
    DataLoader();
    if (web3 !== undefined) {
      async function updateBalance() {
        const balance = web3.utils.fromWei(
          await web3.eth.getBalance(currentAccount),
          "ether"
        );
        dispatch({ type: "SET_BALANCE", payload: balance });
      }

      updateBalance();
    }
  }, [currentAccount]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/*" element={<ModalAuth web3={web3} contract={CI} />} />
        <Route
          path="/profile/*"
          element={<AccountPage web3={web3} contract={CI} />}
        />
        <Route
          path="/shop/*"
          element={<ShopPage web3={web3} contract={CI} />}
        />
      </Routes>
    </div>
  );
}

export default App;

import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { abi } from "./Abi";

export const DataLoader = async (contract, setterCI, setterWeb3) => {
  const contractAddress = "0x188d56E98BCfb02bF59c7fcfe8a85756406B40f6";
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts);
  const shops = useSelector((state) => state.shops);

  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  await setterWeb3(web3);

  const CI = new web3.eth.Contract(abi, contractAddress);
  setterCI(CI);
  console.log(web3);
  console.log(CI);
  const result = await web3.eth.getAccounts();
  dispatch({ type: "SET_ACCOUNTS", payload: result });

  const shopsArr = await contract.methods
    .showShops()
    .call({ from: "0x0000000000000000000000000000000000000000" });
  dispatch({ type: "SET_SHOPS", payload: shopsArr });
};

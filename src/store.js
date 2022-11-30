import { configureStore } from "@reduxjs/toolkit";

const defaultState = {
  accounts: [],
  shops: [],
  currentAccount: "0x0000000000000000000000000000000000000000",
  balance: "0",
  isLogin: false,
  role: "",
  activeRole: "",
  currentShop: "",
  doLike: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_ACCOUNTS":
      return { ...state, accounts: action.payload };
    case "SET_SHOPS":
      return { ...state, shops: action.payload };
    case "SET_CURRENT_ACCOUNT":
      return { ...state, currentAccount: action.payload };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "SET_ISLOGIN":
      return { ...state, isLogin: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_ACTIVE_ROLE":
      return { ...state, activeRole: action.payload };
    case "SET_CURRENT_SHOP":
      return { ...state, currentShop: action.payload };
    case "SET_DOLIKE":
      return { ...state, doLike: action.payload };
    default:
      return state;
  }
};

export default configureStore({
  reducer: reducer,
});

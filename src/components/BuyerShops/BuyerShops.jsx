import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { ShopCard } from "../ShopCard/ShopCard";
import styles from "./BuyerShops.module.css";

export const BuyerShops = (props) => {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const currentRole = useSelector((state) => state.activeRole);
  const currentShop = useSelector((state) => state.currentShop);

  if (currentRole === "0") {
    return (
      <div className={styles.shop_block}>
        {shops.map((shop, index) => {
          console.log(shop, index);
          return (
            <ShopCard
              web3={props.web3}
              key={Math.random()}
              contract={props.contract}
              shop={shop}
              index={index}
            />
          );
        })}
      </div>
    );
  }
  if (currentShop !== "-1") {
    console.log(111);
    return (
      <div className={styles.shop_block}>
        <Routes>
          {shops.map((shop, index) => {
            if (index === Number(currentShop)) {
              return (
                <Route
                  path={index}
                  key={index}
                  element={
                    <ShopCard
                      web3={props.web3}
                      key={index}
                      contract={props.contract}
                      shop={shop}
                      index={index}
                      seller={true}
                    />
                  }
                ></Route>
              );
            }
          })}
        </Routes>
      </div>
    );
  }
};

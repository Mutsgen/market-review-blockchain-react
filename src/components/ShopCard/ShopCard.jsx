import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useNavigate } from "react-router";
import styles from "./ShopCard.module.css";

export const ShopCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const activeRole = useSelector((state) => state.activeRole);
  if (props.shop[0] !== "0x0000000000000000000000000000000000000000") {
    console.log(1112312312321312);

    console.log(props.seller);
    if (props.seller) {
      return (
        <div className={styles.shop_card}>
          <span>Your shop</span>
          <button
            onClick={() => {
              navigate(`/shop/${props.index}`);
            }}
          >
            Open
          </button>
        </div>
      );
    }
    return (
      <div className={styles.shop_card}>
        <span>Shop: {props.index}</span>
        <button
          onClick={() => {
            navigate(`/shop/${props.index}`);
          }}
        >
          Оставить отзыв
        </button>
      </div>
    );
  }
};

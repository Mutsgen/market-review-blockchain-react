import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateReview } from "../CreateReview/CreateReview";
import CreateNewReview from "../CreateNewReview/CreateNewReview";
import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";

export const ShopPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [shops, setShop] = useState(useSelector((state) => state.shops));
  const currentAccount = useSelector((state) => state.currentAccount);
  const [doLike, setDoLike] = useState(0);
  const [goChange, setGochange] = useState(0);
  const activeRole = useSelector((state) => state.activeRole);
  const role = useSelector((state) => state.role);
  const indexFromHref = location.pathname.slice(6);
  let indexToSkip = null;

  useEffect(() => {
    async function updateShop() {
      const shopsArr = await props.contract.methods
        .showShops()
        .call({ from: "0x0000000000000000000000000000000000000000" });
      setShop(shopsArr);
    }
    updateShop();
  }, [shops]);

  if (currentAccount === "" || activeRole === "") {
    navigate("/*");
  }
  if (
    Number(indexFromHref) > shops.length - 1 ||
    isNaN(indexFromHref) ||
    indexFromHref === ""
  ) {
    return (
      <div className="error_404" key={"404"}>
        <span>404 - Not found</span>
      </div>
    );
  }

  const shopInfo = shops[indexFromHref];
  return (
    <div className={styles.shop}>
      {shopInfo.rewievs.map((element, index) => {
        if (element[0] === currentAccount) {
          indexToSkip = index;
          return (
            <div className={styles.your_review} key="your">
              <h2>Ваш отзыв</h2>
              <CreateReview
                reviewIndex={index}
                web3={props.web3}
                contract={props.contract}
                shop={indexFromHref}
                review={element}
                doLike={setDoLike}
              />
            </div>
          );
        }
      })}
      {indexToSkip === null && role !== "1" ? (
        <CreateNewReview
          web3={props.web3}
          contract={props.contract}
          shop={indexFromHref}
          shopInfo={shopInfo}
          doLike={setDoLike}
        />
      ) : null}
      <div className={styles.reviews} key="another">
        <span className={styles.title}>Отзывы</span>
        {shopInfo.rewievs.map((element, index) => {
          // console.log(element);
          // console.log(index !== indexToSkip);
          if (index !== indexToSkip) {
            // console.log(111);
            return (
              <CreateReview
                reviewIndex={index}
                web3={props.web3}
                contract={props.contract}
                shop={indexFromHref}
                review={element}
                doLike={setDoLike}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

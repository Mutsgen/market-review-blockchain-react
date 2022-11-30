import React from "react";
import { useSelector } from "react-redux";
import { RatingLikeDislike } from "../RatingLikeDislike/RatingLikeDislike";
import styles from "./CreateComment.module.css";

export const CreateComment = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  return (
    <div className={styles.comment}>
      <span>
        {props.comment[0] === currentAccount ? "Вы" : props.comment[0]}
      </span>
      <p>{props.comment[1]}</p>
      <RatingLikeDislike
        web3={props.web3}
        contract={props.contract}
        comment={props.comment}
        commentIndex={props.commentIndex}
        shop={props.shop}
        review={props.review}
        reviewIndex={props.reviewIndex}
        doLike={props.doLike}
      />
    </div>
  );
};

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CreateComment } from "../CreateComment/CreateComment";
import { NewComment } from "../NewComment/NewComment";
import { RatingLikeDislike } from "../RatingLikeDislike/RatingLikeDislike";
import styles from "./CreateReview.module.css";

export const CreateReview = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  const role = useSelector((state) => state.role);

  // console.log(props.review);
  // console.log(props.reviewIndex);
  return (
    <div className={styles.review}>
      <span className={styles.creator}>
        {props.review.creator === currentAccount ? "Вы" : props.review.creator}
      </span>
      <span className={styles.stars}>{props.review.stars}</span>
      <p className={styles.comment}>{props.review.comment}</p>
      <RatingLikeDislike
        web3={props.web3}
        contract={props.contract}
        shop={props.shop}
        review={props.review}
        reviewIndex={props.reviewIndex}
        doLike={props.doLike}
      />
      <div className={styles.comments_block}>
        {props.review[4].map((element, index) => {
          return (
            <CreateComment
              web3={props.web3}
              contract={props.contract}
              comment={element}
              commentIndex={index}
              shop={props.shop}
              review={props.review}
              reviewIndex={props.reviewIndex}
              doLike={props.doLike}
            />
          );
        })}
      </div>
      <NewComment
        web3={props.web3}
        contract={props.contract}
        shop={props.shop}
        reviewIndex={props.reviewIndex}
      />
    </div>
  );
};

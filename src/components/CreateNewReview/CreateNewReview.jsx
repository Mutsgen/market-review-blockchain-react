import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import styles from "./CreateNewReview.module.css";

const CreateNewReview = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAccount = useSelector((state) => state.currentAccount);

  const [rate, setRate] = useState();
  const [comment, setComment] = useState();

  return (
    <div className={styles.content}>
      <h2>Оставить отзыв</h2>
      <textarea
        type="text"
        className={styles.comment}
        placeholder="Что вы думаете о ...?"
        cols="60"
        rows="5"
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <div className="rate-picker">
        <ReactStars
          count={10}
          onChange={setRate}
          size={30}
          activeColor="#ffd700"
        />
      </div>
      <button
        className={styles.send}
        onClick={async () => {
          if (currentAccount !== "0x0000000000000000000000000000000000000000") {
            await props.contract.methods
              .createRewiev(props.shop, rate, comment)
              .send(
                { from: currentAccount, gas: "6721975" },
                (error, result) => {
                  console.log(result);
                  console.log(error);
                }
              );
            navigate(`/*`);
          }
        }}
      >
        Отправить отзыв
      </button>
    </div>
  );
};

export default CreateNewReview;

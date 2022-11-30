import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const RatingLikeDislike = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  const [changed, setChanget] = useState(0);

  let shops;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const updateShops = async () => {
    const shopsArr = await props.contract.methods
      .showShops()
      .call({ from: currentAccount });
    return shopsArr;
  };
  useEffect(() => {
    const updateLike = async () => {
      shops = await updateShops();
      if (shops !== undefined && props.comment === undefined) {
        const rateArr = shops[props.shop][4][props.reviewIndex][3];

        if (Number(likes) + Number(dislikes) !== rateArr.length) {
          let countLike = Number(likes);
          let countDislike = Number(dislikes);
          for (let i = 0; i < rateArr.length; i++) {
            const element = rateArr[i];
            if (element[1]) {
              countLike += 1;
            }
            if (!element[1]) countDislike += 1;
          }
          setLikes(countLike);
          setDislikes(countDislike);
        }
      }
      if (shops !== undefined && props.comment !== undefined) {
        const rateArr =
          shops[props.shop][4][props.reviewIndex][4][props.commentIndex][2];
        if (Number(likes) + Number(dislikes) !== rateArr.length) {
          let countLike = Number(likes);
          let countDislike = Number(dislikes);
          for (let i = 0; i < rateArr.length; i++) {
            const element = rateArr[i];
            if (element[1]) {
              countLike += 1;
            }
            if (!element[1]) countDislike += 1;
          }
          setLikes(countLike);
          setDislikes(countDislike);
        }
      }
    };
    updateLike();
  }, [shops]);

  if (props.review !== undefined && props.comment === undefined) {
    const doRate = async (ansfer) => {
      shops = await updateShops();
      setChanget(Math.random());

      const rateArr = shops[props.shop][4][props.reviewIndex][3];
      console.log(shops);
      for (let i = 0; i < rateArr.length; i++) {
        const element = rateArr[i];
        if (element[0] === currentAccount) {
          return alert("already");
        }
      }

      await props.contract.methods
        .leaveLikeDislikeOnRewiev(props.shop, props.reviewIndex, ansfer)
        .send({ from: currentAccount }, async (error, result) => {
          if (error === null) {
            console.log(props);
            props.doLike(Math.random());
          }
        });
      shops = await updateShops();
    };
    return (
      <div className="full-rating">
        <button
          className="like"
          onClick={async () => {
            await doRate(true);
          }}
        >
          +
        </button>
        <span className="count-like">{likes}</span>
        <button
          className="dislike"
          onClick={async () => {
            await doRate(false);
          }}
        >
          -
        </button>
        <span className="count-dislike">{dislikes}</span>
      </div>
    );
  }
  if (props.review !== undefined && props.comment !== undefined) {
    const doRate = async (ansfer) => {
      shops = await updateShops();
      setChanget(Math.random());

      const rateArr =
        shops[props.shop][4][props.reviewIndex][4][props.commentIndex][2];
      for (let i = 0; i < rateArr.length; i++) {
        const element = rateArr[i];
        if (element[0] === currentAccount) {
          return alert("already");
        }
      }

      await props.contract.methods
        .leaveLikeDislikeOnComment(
          props.shop,
          props.reviewIndex,
          props.commentIndex,
          ansfer
        )
        .send({ from: currentAccount }, async (error, result) => {
          if (error === null) {
            console.log(props);
            props.doLike(Math.random());
          }
        });
      shops = await updateShops();
    };
    return (
      <div className="full-rating">
        <button
          className="like"
          onClick={async () => {
            await doRate(true);
          }}
        >
          +
        </button>
        <span className="count-like">{likes}</span>
        <button
          className="dislike"
          onClick={async () => {
            await doRate(false);
          }}
        >
          -
        </button>
        <span className="count-dislike">{dislikes}</span>
      </div>
    );
  }
};

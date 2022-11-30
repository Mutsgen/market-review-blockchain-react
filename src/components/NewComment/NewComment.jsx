import React from "react";
import { useSelector } from "react-redux";

export const NewComment = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  const [text, setText] = React.useState("");
  return (
    <div className="create-comment">
      <input
        type="text"
        value={text}
        placeholder="Комментарий..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          props.contract.methods
            .commentRewiev(props.shop, props.reviewIndex, text)
            .send({ from: currentAccount, gas: "6721975" }, (error, result) => {
              console.log(error);
              console.log(result);
            });
        }}
      >
        Отправить
      </button>
    </div>
  );
};

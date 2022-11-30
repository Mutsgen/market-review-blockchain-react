import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const RoleRequests = (props) => {
  const currentAccount = useSelector((state) => state.currentAccount);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (requests[0] === undefined) {
      async function updateReq() {
        async function updateRequests() {
          const requests = await props.contract.methods.showRequests().call();
          console.log(requests);
          setRequests(requests);
        }
        await updateRequests();
      }
      updateReq();
    }
  }, [requests]);
  if (requests !== undefined && requests.length !== 0) {
    async function confirmRequests(id) {
      await props.contract.methods
        .acceptRequest(id)
        .send({ from: currentAccount, gas: "6721975" });
    }
    // updateRequests();
    console.log(requests.length);
    return (
      <div>
        {requests.map((element, index) => {
          if (element[3] === false) {
            return (
              <div>
                <span>Account: {element[0]}</span>
                <span>To role: {element[1] == 1 ? "seller" : "buyer"}</span>
                {element[1] == 0 ? <span>To shop: {element[2]}</span> : null}
                {element[3] == false ? (
                  <button
                    onClick={async () => {
                      confirmRequests(index);
                    }}
                  >
                    Принять
                  </button>
                ) : null}
              </div>
            );
          }
        })}
      </div>
    );
  }
};

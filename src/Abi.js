export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "acceptRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "shop",
        type: "int256",
      },
    ],
    name: "changeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    name: "commentRewiev",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "shop",
        type: "address",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "password",
        type: "bytes32",
      },
    ],
    name: "createNewShop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id_shop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stars",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    name: "createRewiev",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id_shop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id_rewiev",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id_comment",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "rate",
        type: "bool",
      },
    ],
    name: "leaveLikeDislikeOnComment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id_shop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id_rewiev",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "rate",
        type: "bool",
      },
    ],
    name: "leaveLikeDislikeOnRewiev",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "password",
        type: "bytes32",
      },
    ],
    name: "registration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shop",
        type: "uint256",
      },
    ],
    name: "removeShop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "id_shop",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "requestToChangeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "switchActiveRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "password",
        type: "bytes32",
      },
    ],
    name: "login",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "shop",
        type: "int256",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "shops",
    outputs: [
      {
        internalType: "address",
        name: "shop_address",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "password",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "showHistory",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "showRequests",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "role",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "shop",
            type: "int256",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct MarketplaceRewievs.Request[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "showShops",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "shop_address",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "password",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "workers",
            type: "address[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "creator",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "stars",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "comment",
                type: "string",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "user",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "rate",
                    type: "bool",
                  },
                ],
                internalType: "struct MarketplaceRewievs.Rate[]",
                name: "rates",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "creator",
                    type: "address",
                  },
                  {
                    internalType: "string",
                    name: "comment",
                    type: "string",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "user",
                        type: "address",
                      },
                      {
                        internalType: "bool",
                        name: "rate",
                        type: "bool",
                      },
                    ],
                    internalType: "struct MarketplaceRewievs.Rate[]",
                    name: "rates",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MarketplaceRewievs.RewievComment[]",
                name: "comments",
                type: "tuple[]",
              },
            ],
            internalType: "struct MarketplaceRewievs.Rewiev[]",
            name: "rewievs",
            type: "tuple[]",
          },
        ],
        internalType: "struct MarketplaceRewievs.Shop[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "showShopWorkers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adr",
        type: "address",
      },
    ],
    name: "showUser",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "password",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "role",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activeRole",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "shop",
            type: "int256",
          },
          {
            internalType: "string[]",
            name: "history",
            type: "string[]",
          },
        ],
        internalType: "struct MarketplaceRewievs.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "bytes32",
        name: "password",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "activeRole",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "shop",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

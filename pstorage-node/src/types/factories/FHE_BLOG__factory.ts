/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { FHE_BLOG, FHE_BLOGInterface } from "../FHE_BLOG";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "TOKEN_URI",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nft",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "relayer_id",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_nonce",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nft",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "relayer_id",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "generateJwt",
    outputs: [
      {
        components: [
          {
            internalType: "bytes[2]",
            name: "p",
            type: "bytes[2]",
          },
        ],
        internalType: "struct DecryptedBlog",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "relayer_id",
        type: "uint256",
      },
    ],
    name: "getCid",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes[]",
            name: "cid",
            type: "bytes[]",
          },
          {
            internalType: "bytes32[]",
            name: "publicKey",
            type: "bytes32[]",
          },
        ],
        internalType: "struct BlogStorage",
        name: "_data",
        type: "tuple",
      },
      {
        internalType: "bytes[2][]",
        name: "_p",
        type: "bytes[2][]",
      },
      {
        internalType: "string",
        name: "_nft_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_nft_short_name",
        type: "string",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [],
    name: "mintNft",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
    name: "reward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_tokenCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nft",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "relayer_id",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "verifySignature",
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
] as const;

const _bytecode =
  "0x608060405234801562000010575f80fd5b506200001b62000021565b620000d5565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000900460ff1615620000725760405163f92ee8a960e01b815260040160405180910390fd5b80546001600160401b0390811614620000d25780546001600160401b0319166001600160401b0390811782556040519081527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50565b61264f80620000e35f395ff3fe608060405260043610610183575f3560e01c80636e02007d116100d1578063b88d4fde1161007c578063c87b56dd11610057578063c87b56dd14610426578063d319896e14610445578063e985e9c514610464575f80fd5b8063b88d4fde146103d3578063ba071e1b146103f2578063c2229fea1461041e575f80fd5b80638da5cb5b116100ac5780638da5cb5b1461038157806395d89b41146103a0578063a22cb465146103b4575f80fd5b80636e02007d1461033b57806370a082311461034e57806378ce90351461036d575f80fd5b8063247f024d1161013157806342842e0e1161010c57806342842e0e146102d25780636352211e146102f15780636353586b14610310575f80fd5b8063247f024d146102755780633beaa6ab146102945780633d68eb1d146102b3575f80fd5b8063095ea7b311610161578063095ea7b3146102135780630b21a83b1461023457806323b872dd14610256575f80fd5b806301ffc9a71461018757806306fdde03146101bb578063081812fc146101dc575b5f80fd5b348015610192575f80fd5b506101a66101a1366004611c54565b6104ca565b60405190151581526020015b60405180910390f35b3480156101c6575f80fd5b506101cf61051b565b6040516101b29190611cbc565b3480156101e7575f80fd5b506101fb6101f6366004611cce565b6105cf565b6040516001600160a01b0390911681526020016101b2565b34801561021e575f80fd5b5061023261022d366004611d00565b610615565b005b34801561023f575f80fd5b506102485f5481565b6040519081526020016101b2565b348015610261575f80fd5b50610232610270366004611d28565b610624565b348015610280575f80fd5b506101a661028f366004611e2f565b6106c8565b34801561029f575f80fd5b506101cf6102ae366004611cce565b610790565b3480156102be575f80fd5b506102326102cd366004611ee1565b61083d565b3480156102dd575f80fd5b506102326102ec366004611d28565b610cd3565b3480156102fc575f80fd5b506101fb61030b366004611cce565b610ced565b34801561031b575f80fd5b5061024861032a366004611fcc565b60056020525f908152604090205481565b348015610346575f80fd5b505f54610248565b348015610359575f80fd5b50610248610368366004611fcc565b610cf7565b348015610378575f80fd5b506101cf610d62565b34801561038c575f80fd5b506007546101fb906001600160a01b031681565b3480156103ab575f80fd5b506101cf610d7e565b3480156103bf575f80fd5b506102326103ce366004611fe5565b610dcf565b3480156103de575f80fd5b506102326103ed36600461201e565b610dda565b3480156103fd575f80fd5b5061041161040c366004612082565b610df7565b6040516101b291906120d6565b610232610ef3565b348015610431575f80fd5b506101cf610440366004611cce565b610fa0565b348015610450575f80fd5b5061023261045f36600461212c565b610fc1565b34801561046f575f80fd5b506101a661047e36600461219d565b6001600160a01b039182165f9081527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab00793056020908152604080832093909416825291909152205460ff1690565b5f6001600160e01b031982166380ac58cd60e01b14806104fa57506001600160e01b03198216635b5e139f60e01b145b8061051557506301ffc9a760e01b6001600160e01b03198316145b92915050565b7f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab0079300805460609190819061054d906121ce565b80601f0160208091040260200160405190810160405280929190818152602001828054610579906121ce565b80156105c45780601f1061059b576101008083540402835291602001916105c4565b820191905f5260205f20905b8154815290600101906020018083116105a757829003601f168201915b505050505091505090565b5f6105d9826110ac565b505f8281527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930460205260409020546001600160a01b0316610515565b610620828233611103565b5050565b6001600160a01b038316158061064157506001600160a01b038216155b6106b85760405162461bcd60e51b815260206004820152602e60248201527f4e6f6e5472616e736665727261626c65455243373231546f6b656e3a206e6f6e60448201527f207472616e736665727261626c6500000000000000000000000000000000000060648201526084015b60405180910390fd5b6106c3838383611110565b505050565b604080517f39f4c5dc4987ba10c22bccffc6aa83320b32e5efb44bc790d0fffcbb8492946260208083019190915281830188905260ff871660608301526001600160a01b038516608083015260a08083018790528351808403909101815260c08301845280519082012060065461190160f01b60e085015260e28401526101028084018290528451808503909101815261012290930190935281519101205f9190826107748286611193565b6001600160a01b03878116911614935050505095945050505050565b606060025f0182815481106107a7576107a7612206565b905f5260205f200180546107ba906121ce565b80601f01602080910402602001604051908101604052809291908181526020018280546107e6906121ce565b80156108315780601f1061080857610100808354040283529160200191610831565b820191905f5260205f20905b81548152906001019060200180831161081457829003601f168201915b50505050509050919050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000810460ff16159067ffffffffffffffff165f811580156108875750825b90505f8267ffffffffffffffff1660011480156108a35750303b155b9050811580156108b1575080155b156108cf5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561090357845468ff00000000000000001916680100000000000000001785555b61097489898080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525050604080516020601f8d018190048102820181019092528b815292508b91508a90819084018382808284375f920191909152506111bb92505050565b5f5b6109808d8061221a565b9050811015610b6d5760026109958e8061221a565b838181106109a5576109a5612206565b90506020028101906109b79190612260565b82546001810184555f9384526020909320909201916109d691836122e7565b506109df611b90565b6001805480820182555f91909152610a209060029081027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601908390611bae565b50610a938d8d84818110610a3657610a36612206565b9050602002810190610a4891906123a1565b5f5b602002810190610a5a9190612260565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152506111cd92505050565b60018381548110610aa657610aa6612206565b5f918252602082206002909102010155610ae48d8d84818110610acb57610acb612206565b9050602002810190610add91906123a1565b6001610a4a565b60018381548110610af757610af7612206565b905f5260205f209060020201600160028110610b1557610b15612206565b018190555060026001018e8060200190610b2f919061221a565b84818110610b3f57610b3f612206565b8354600180820186555f95865260209586902092909502939093013592019190915550919091019050610976565b505f8055604080518082018252600781527f466865426c6f67000000000000000000000000000000000000000000000000006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f918101919091527fc667c8a336a824636925e27af98cf090f0f09ad8b8a6e2513ecf75627dc4efcb918101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160408051601f1981840301815291905280516020909101206006556007805473ffffffffffffffffffffffffffffffffffffffff1916321790558315610cc557845468ff000000000000000019168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050505050565b6106c383838360405180602001604052805f815250610dda565b5f610515826110ac565b5f7f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab00793006001600160a01b038316610d42576040516322718ad960e21b81525f60048201526024016106af565b6001600160a01b039092165f908152600390920160205250604090205490565b6040518060800160405280605781526020016125ec6057913981565b7f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930180546060917f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab00793009161054d906121ce565b6106203383836111d9565b610de5848484610624565b610df18484848461129b565b50505050565b610dff611bec565b836001600160a01b0316610e1287610ced565b6001600160a01b031614610e2857610e286123bf565b610e3586868587866106c8565b1515600114610e4657610e466123bf565b610e4e611bec565b610e56611c04565b610ea660018860ff1681548110610e6f57610e6f612206565b5f91825260208220600290910201905b01546003805460ff8b16908110610e9857610e98612206565b905f5260205f2001546113ba565b815260018054610ee2919060ff8a16908110610ec457610ec4612206565b905f5260205f209060020201600160028110610e7f57610e7f612206565b602082015281529695505050505050565b662386f26fc10000341015610f4a5760405162461bcd60e51b815260206004820152601c60248201527f4648455f424c4f473a20696e73756666696369656e742066756e64730000000060448201526064016106af565b610f55335f546113cd565b5f54610f629060016123d3565b5f9081556007546040516001600160a01b03909116913480156108fc02929091818181858888f19350505050158015610f9d573d5f803e3d5ffd5b50565b60606040518060800160405280605781526020016125ec6057913992915050565b826001600160a01b0316610fd486610ced565b6001600160a01b031614610fea57610fea6123bf565b61100185858467ffffffffffffffff1686856106c8565b1515600114611012576110126123bf565b6001600160a01b0383165f90815260046020908152604080832067ffffffffffffffff8616845290915281205460ff16151590036110a5576001600160a01b0383165f90815260046020908152604080832067ffffffffffffffff861684528252808320805460ff191660019081179091553384526005909252822080549192909161109f9084906123d3565b90915550505b5050505050565b5f8181527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930260205260408120546001600160a01b03168061051557604051637e27328960e01b8152600481018490526024016106af565b6106c383838360016113e6565b6001600160a01b03821661113957604051633250574960e11b81525f60048201526024016106af565b5f611145838333611556565b9050836001600160a01b0316816001600160a01b031614610df1576040516364283d7b60e01b81526001600160a01b03808616600483015260248201849052821660448201526064016106af565b5f805f806111a1868661169d565b9250925092506111b182826116e6565b5090949350505050565b6111c361179e565b61062082826117ee565b5f610515826003611831565b7f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab00793006001600160a01b03831661122c57604051630b61174360e31b81526001600160a01b03841660048201526024016106af565b6001600160a01b038481165f818152600584016020908152604080832094881680845294825291829020805460ff191687151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a350505050565b6001600160a01b0383163b15610df157604051630a85bd0160e11b81526001600160a01b0384169063150b7a02906112dd9033908890879087906004016123f2565b6020604051808303815f875af1925050508015611317575060408051601f3d908101601f191682019092526113149181019061242d565b60015b61137e573d808015611344576040519150601f19603f3d011682016040523d82523d5f602084013e611349565b606091505b5080515f0361137657604051633250574960e11b81526001600160a01b03851660048201526024016106af565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b146110a557604051633250574960e11b81526001600160a01b03851660048201526024016106af565b60606113c683836118c4565b9392505050565b610620828260405180602001604052805f81525061192f565b7f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab0079300818061141b57506001600160a01b03831615155b15611519575f61142a856110ac565b90506001600160a01b038416158015906114565750836001600160a01b0316816001600160a01b031614155b80156114a657506001600160a01b038082165f9081527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab0079305602090815260408083209388168352929052205460ff16155b156114cf5760405163a9fbf51f60e01b81526001600160a01b03851660048201526024016106af565b82156115175784866001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5f938452600401602052505060409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b5f8281527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930260205260408120547f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab0079300906001600160a01b03908116908416156115c3576115c3818587611945565b6001600160a01b038116156115ff576115de5f865f806113e6565b6001600160a01b0381165f908152600383016020526040902080545f190190555b6001600160a01b0386161561162f576001600160a01b0386165f9081526003830160205260409020805460010190555b5f858152600283016020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038a811691821790925591518893918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a495945050505050565b5f805f83516041036116d4576020840151604085015160608601515f1a6116c6888285856119a9565b9550955095505050506116df565b505081515f91506002905b9250925092565b5f8260038111156116f9576116f9612448565b03611702575050565b600182600381111561171657611716612448565b036117345760405163f645eedf60e01b815260040160405180910390fd5b600282600381111561174857611748612448565b036117695760405163fce698f760e01b8152600481018290526024016106af565b600382600381111561177d5761177d612448565b03610620576040516335e2f38360e21b8152600481018290526024016106af565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005468010000000000000000900460ff166117ec57604051631afcd79f60e31b815260040160405180910390fd5b565b6117f661179e565b7f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930080611822848261245c565b5060018101610df1838261245c565b5f80838360f81b60405160200161184992919061251c565b60408051601f1981840301815290829052630964a5d960e31b82529150605d90634b252ec89061187d908490600401611cbc565b602060405180830381865afa158015611898573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906118bc9190612562565b949350505050565b60405163d6ad57cd60e01b81526004810183905260248101829052606090605d9063d6ad57cd906044015f60405180830381865afa158015611908573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526113c69190810190612579565b6119398383611a71565b6106c35f84848461129b565b611950838383611ad2565b6106c3576001600160a01b03831661197e57604051637e27328960e01b8152600481018290526024016106af565b60405163177e802f60e01b81526001600160a01b0383166004820152602481018290526044016106af565b5f80807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08411156119e257505f91506003905082611a67565b604080515f808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015611a33573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b038116611a5e57505f925060019150829050611a67565b92505f91508190505b9450945094915050565b6001600160a01b038216611a9a57604051633250574960e11b81525f60048201526024016106af565b5f611aa683835f611556565b90506001600160a01b038116156106c3576040516339e3563760e11b81525f60048201526024016106af565b5f6001600160a01b038316158015906118bc5750826001600160a01b0316846001600160a01b03161480611b4957506001600160a01b038085165f9081527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab0079305602090815260408083209387168352929052205460ff165b806118bc5750505f9081527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930460205260409020546001600160a01b03908116911614919050565b60405180604001604052806002906020820280368337509192915050565b8260028101928215611bdc579160200282015b82811115611bdc578251825591602001919060010190611bc1565b50611be8929150611c2b565b5090565b6040518060200160405280611bff611c04565b905290565b60405180604001604052806002905b6060815260200190600190039081611c135790505090565b5b80821115611be8575f8155600101611c2c565b6001600160e01b031981168114610f9d575f80fd5b5f60208284031215611c64575f80fd5b81356113c681611c3f565b5f5b83811015611c89578181015183820152602001611c71565b50505f910152565b5f8151808452611ca8816020860160208601611c6f565b601f01601f19169290920160200192915050565b602081525f6113c66020830184611c91565b5f60208284031215611cde575f80fd5b5035919050565b80356001600160a01b0381168114611cfb575f80fd5b919050565b5f8060408385031215611d11575f80fd5b611d1a83611ce5565b946020939093013593505050565b5f805f60608486031215611d3a575f80fd5b611d4384611ce5565b9250611d5160208501611ce5565b9150604084013590509250925092565b803560ff81168114611cfb575f80fd5b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611dae57611dae611d71565b604052919050565b5f67ffffffffffffffff821115611dcf57611dcf611d71565b50601f01601f191660200190565b5f82601f830112611dec575f80fd5b8135611dff611dfa82611db6565b611d85565b818152846020838601011115611e13575f80fd5b816020850160208301375f918101602001919091529392505050565b5f805f805f60a08688031215611e43575f80fd5b85359450611e5360208701611d61565b935060408601359250611e6860608701611ce5565b9150608086013567ffffffffffffffff811115611e83575f80fd5b611e8f88828901611ddd565b9150509295509295909350565b5f8083601f840112611eac575f80fd5b50813567ffffffffffffffff811115611ec3575f80fd5b602083019150836020828501011115611eda575f80fd5b9250929050565b5f805f805f805f6080888a031215611ef7575f80fd5b873567ffffffffffffffff80821115611f0e575f80fd5b908901906040828c031215611f21575f80fd5b90975060208901359080821115611f36575f80fd5b818a0191508a601f830112611f49575f80fd5b813581811115611f57575f80fd5b8b60208260051b8501011115611f6b575f80fd5b6020830198508097505060408a0135915080821115611f88575f80fd5b611f948b838c01611e9c565b909650945060608a0135915080821115611fac575f80fd5b50611fb98a828b01611e9c565b989b979a50959850939692959293505050565b5f60208284031215611fdc575f80fd5b6113c682611ce5565b5f8060408385031215611ff6575f80fd5b611fff83611ce5565b915060208301358015158114612013575f80fd5b809150509250929050565b5f805f8060808587031215612031575f80fd5b61203a85611ce5565b935061204860208601611ce5565b925060408501359150606085013567ffffffffffffffff81111561206a575f80fd5b61207687828801611ddd565b91505092959194509250565b5f805f805f60a08688031215612096575f80fd5b853594506120a660208701611d61565b93506120b460408701611ce5565b925060608601359150608086013567ffffffffffffffff811115611e83575f80fd5b602080825282518282018290525f9190608084019060408501845b600281101561212057603f1987850301825261210e848451611c91565b935091840191908401906001016120f1565b50919695505050505050565b5f805f805f60a08688031215612140575f80fd5b8535945061215060208701611d61565b935061215e60408701611ce5565b9250606086013567ffffffffffffffff808216821461217b575f80fd5b90925060808701359080821115612190575f80fd5b50611e8f88828901611ddd565b5f80604083850312156121ae575f80fd5b6121b783611ce5565b91506121c560208401611ce5565b90509250929050565b600181811c908216806121e257607f821691505b60208210810361220057634e487b7160e01b5f52602260045260245ffd5b50919050565b634e487b7160e01b5f52603260045260245ffd5b5f808335601e1984360301811261222f575f80fd5b83018035915067ffffffffffffffff821115612249575f80fd5b6020019150600581901b3603821315611eda575f80fd5b5f808335601e19843603018112612275575f80fd5b83018035915067ffffffffffffffff82111561228f575f80fd5b602001915036819003821315611eda575f80fd5b601f8211156106c357805f5260205f20601f840160051c810160208510156122c85750805b601f840160051c820191505b818110156110a5575f81556001016122d4565b67ffffffffffffffff8311156122ff576122ff611d71565b6123138361230d83546121ce565b836122a3565b5f601f841160018114612344575f851561232d5750838201355b5f19600387901b1c1916600186901b1783556110a5565b5f83815260208120601f198716915b828110156123735786850135825560209485019460019092019101612353565b508682101561238f575f1960f88860031b161c19848701351681555b505060018560011b0183555050505050565b5f8235603e198336030181126123b5575f80fd5b9190910192915050565b634e487b7160e01b5f52600160045260245ffd5b8082018082111561051557634e487b7160e01b5f52601160045260245ffd5b5f6001600160a01b038087168352808616602084015250836040830152608060608301526124236080830184611c91565b9695505050505050565b5f6020828403121561243d575f80fd5b81516113c681611c3f565b634e487b7160e01b5f52602160045260245ffd5b815167ffffffffffffffff81111561247657612476611d71565b61248a8161248484546121ce565b846122a3565b602080601f8311600181146124bd575f84156124a65750858301515b5f19600386901b1c1916600185901b178555612514565b5f85815260208120601f198616915b828110156124eb578886015182559484019460019091019084016124cc565b508582101561250857878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b5f835161252d818460208801611c6f565b7fff00000000000000000000000000000000000000000000000000000000000000939093169190920190815260010192915050565b5f60208284031215612572575f80fd5b5051919050565b5f60208284031215612589575f80fd5b815167ffffffffffffffff81111561259f575f80fd5b8201601f810184136125af575f80fd5b80516125bd611dfa82611db6565b8181528560208385010111156125d1575f80fd5b6125e2826020830160208601611c6f565b9594505050505056fe697066733a2f2f62616679626569673337696f6972373673376d67356f6f6265746e636f6a636d3363336878617379643472766964346a71687934676b61686567342f3f66696c656e616d653d302d5055472e6a736f6ea164736f6c6343000816000a";

type FHE_BLOGConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FHE_BLOGConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FHE_BLOG__factory extends ContractFactory {
  constructor(...args: FHE_BLOGConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      FHE_BLOG & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FHE_BLOG__factory {
    return super.connect(runner) as FHE_BLOG__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FHE_BLOGInterface {
    return new Interface(_abi) as FHE_BLOGInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): FHE_BLOG {
    return new Contract(address, _abi, runner) as unknown as FHE_BLOG;
  }
}

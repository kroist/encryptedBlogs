/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type BlogStorageStruct = {
  cid: BytesLike[];
  p: [BigNumberish, BigNumberish][];
  publicKey: BytesLike[];
};

export type BlogStorageStructOutput = [
  cid: string[],
  p: [bigint, bigint][],
  publicKey: string[]
] & { cid: string[]; p: [bigint, bigint][]; publicKey: string[] };

export interface FHEBlogFactoryCrutchInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "blogs"
      | "blogsCount"
      | "createBlog((bytes[],uint64[2][],bytes32[]),address[],string,string,bytes32)"
      | "createBlog((bytes[],uint64[2][],bytes32[]),address[],bytes32)"
      | "creator"
      | "eip712Domain"
      | "getBlogAddress"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;

  encodeFunctionData(functionFragment: "blogs", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "blogsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createBlog((bytes[],uint64[2][],bytes32[]),address[],string,string,bytes32)",
    values: [BlogStorageStruct, AddressLike[], string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createBlog((bytes[],uint64[2][],bytes32[]),address[],bytes32)",
    values: [BlogStorageStruct, AddressLike[], BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "creator", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "eip712Domain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBlogAddress",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "blogs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "blogsCount", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createBlog((bytes[],uint64[2][],bytes32[]),address[],string,string,bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createBlog((bytes[],uint64[2][],bytes32[]),address[],bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "creator", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "eip712Domain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBlogAddress",
    data: BytesLike
  ): Result;
}

export namespace EIP712DomainChangedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface FHEBlogFactoryCrutch extends BaseContract {
  connect(runner?: ContractRunner | null): FHEBlogFactoryCrutch;
  waitForDeployment(): Promise<this>;

  interface: FHEBlogFactoryCrutchInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  blogs: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  blogsCount: TypedContractMethod<[], [bigint], "view">;

  "createBlog((bytes[],uint64[2][],bytes32[]),address[],string,string,bytes32)": TypedContractMethod<
    [
      _data: BlogStorageStruct,
      _relayer_addresses: AddressLike[],
      _nft_name: string,
      _nft_short_name: string,
      salt: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  "createBlog((bytes[],uint64[2][],bytes32[]),address[],bytes32)": TypedContractMethod<
    [
      _data: BlogStorageStruct,
      _relayer_addresses: AddressLike[],
      salt: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  creator: TypedContractMethod<[], [string], "view">;

  eip712Domain: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;

  getBlogAddress: TypedContractMethod<[salt: BytesLike], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "blogs"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "blogsCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "createBlog((bytes[],uint64[2][],bytes32[]),address[],string,string,bytes32)"
  ): TypedContractMethod<
    [
      _data: BlogStorageStruct,
      _relayer_addresses: AddressLike[],
      _nft_name: string,
      _nft_short_name: string,
      salt: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createBlog((bytes[],uint64[2][],bytes32[]),address[],bytes32)"
  ): TypedContractMethod<
    [
      _data: BlogStorageStruct,
      _relayer_addresses: AddressLike[],
      salt: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "creator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "eip712Domain"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getBlogAddress"
  ): TypedContractMethod<[salt: BytesLike], [string], "view">;

  getEvent(
    key: "EIP712DomainChanged"
  ): TypedContractEvent<
    EIP712DomainChangedEvent.InputTuple,
    EIP712DomainChangedEvent.OutputTuple,
    EIP712DomainChangedEvent.OutputObject
  >;

  filters: {
    "EIP712DomainChanged()": TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
    EIP712DomainChanged: TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
  };
}

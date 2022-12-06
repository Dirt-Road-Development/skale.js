import { BigNumber, BytesLike } from "ethers";
import { MSGFunctions } from "./functions";

export interface IAddress {
    address: string;
}

export interface IReplaceOwner {
    owner: string;
    newOwner: string;
}

export interface IRequirement {
    required: number;
}

export interface ICreateNewWallet {
    owners: string[];
    required: number;
}

export interface IBaseTransaction {
    destination: string;
    value: BigNumber;
    data: BytesLike;
}

export interface ITransaction extends IBaseTransaction {
    executed: boolean;
}

export interface ITransactionId {
    transactionId: BigNumber;
}

export interface ITransactionCount {
    pending: boolean;
    executed: boolean;
}

export interface ITransactionIds {
    from: BigNumber;
    to: BigNumber;
    pending: boolean;
    executed: boolean;
}

export interface IOnlyWalletFunction {
    function: MSGFunctions;
    values: any[];
}
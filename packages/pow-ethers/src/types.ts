import BN from "bn.js";
import { BytesLike } from "@ethersproject/bytes";
import { Web3Provider} from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";

/**
 * @type
 * @name AnonymousParams
 * @description Parameters for creation of new AnonymousPoW class
 * 
 * @param {BN?} difficulty - Difficulty which defaults to BN(1)
 * @param {string} rpcUrl - of SKALE Chain to connect to
 */
export type AnonymousParams = {
    difficulty?: BN;
    rpcUrl: string;
}

/**
 * 
 * @type
 * @name AnonymousContractParams
 * @description Parameters for creation of new AnonymousPoWContract class
 * 
 * {@inheritdoc AnonymousParams}
 * @param {any} abi - ABI of smart contract. Generally passed in as a JSON array
 * @param {string} address - 0x Address of the smart contract
 */
export type AnonymousContractParams = {
    abi: any;
    address: string;
} & AnonymousParams;

/**
 * @type
 * @name InjectedParams
 * 
 * @param {BN?} difficulty - Difficulty which defaults to BN(1)
 * @param {Web3Provider} provider - Web3Provider from ethers [created on client]
 */
export type InjectedParams = {
    difficulty?: BN;
    provider: Web3Provider;
}

/**
 * 
 * @type
 * @name InjectedContractParams
 * @description Parameters for creation of new AnonymousPoWContract class
 * 
 * {@inheritdoc InjectedParams}
 * @param {any} abi - ABI of smart contract. Generally passed in as a JSON array
 * @param {string} address - 0x Address of the smart contract
 */
export type InjectedContractParams = {
    abi: any;
    address: string;
} & InjectedParams;

/**
 * @type
 * @name WalletParams
 * 
 * @param {BN?} difficulty - Difficulty which defaults to BN(1)
 * @param {Wallet} wallet - Web3 Ethers Wallet which should contain a provider
 */
export type WalletParams = {
    difficulty?: BN;
    wallet: Wallet;
}

/**
 * @type
 * @name WalletContractParams
 * 
 * {@inheritdoc WalletParams}
 * @param {any} abi - ABI of smart contract. Generally passed in as a JSON array
 * @param {string} address - 0x Address of the smart contract
 */
export type WalletContractParams = {
    abi: any;
    address: string;
} & WalletParams;

/**
 * @type
 * @name TransactionParams
 * @description Parameters for Sending Tx with pre-created function data
 * 
 * @param {string?} to - Address of To to send to
 * @param {BytesLike} data - Hex String or Bytes of Encoded Function Data
 * @param {BN?} gas - Optional Gas, Default Gas Price is 1000000
 */
export type TransactionParams = {
    to?: string;
    data: BytesLike;
    gas?: BN;
}

/**
 * @type
 * @name ContractTransactionParams
 * @description Parameters for Sending Tx which predefined contract
 * 
 * @param {string} functionName - Name of the matching function in the ABI* 
 * @param {any[]} functionArgs - functionArgs passed into send function
 * @param {BN?} gas - Optional Default Gas Price
 */
export type ContractTransactionParams = {
    functionName: string;
    functionArgs: any[];
    gas?: BN;
}
  
/**
 * 
 * @type
 * @name EncodeSendParams
 * @description Parameters for Encoding and Sending Data for a more generalized send option
 * 
 * @param {any} abi - ABI of smart contract. Generally passed in as a JSON array
 * @param {string} functionName - Name of the matching function in the ABI* 
 * @param {any[]} functionArgs - functionArgs passed into send function
 * {@inheritdoc TransactionParams}
 */
export type EncodeSendParams = {
    abi: any;
    functionName: string;
    functionArgs: any[];
} & TransactionParams;

/**
 * @type
 * @name ContractConfig
 * 
 * @param {any} abi - Abi of the contract
 * @param {string} - Bytecode of the contract
 */
export type Contract = {
    abi: any;
    bytecode: string;
};
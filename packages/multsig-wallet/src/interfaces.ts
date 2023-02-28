/**
 * 
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/multisig-wallet
 * 
 * @file interfaces.ts
 * @author Sawyer Cutler
 * 
*/


import { BigNumber, BytesLike } from "ethers";
import { MSGFunctions } from "./functions";

/**
 * Base Address Interface
 * 
 * @param {string} address - Address to Add or Check
 */
export interface IAddress {
    address: string;
}

/**
 * Interface for swapping owners on multisig
 * 
 * @param {string} owner - Existing Owner to Remove
 * @param {string} newOwner - New Owner to Add
 */
export interface IReplaceOwner {
    owner: string;
    newOwner: string;
}

/**
 * Used for requirment change/check functions
 * 
 * @param {number} required - Number of Requirements
 */
export interface IRequirement {
    required: number;
}

/**
 * Parameters for Creating a new multisig
 * Owners >= requirements
 * 
 * @param {string[]} owners
 * @param {number} required
 */
export interface ICreateNewWallet {
    owners: string[];
    required: number;
}

/**
 * Base Transaction Sent through the multisigi
 * Value can always be 0 if no sFUEL is needed to be sent
 * 
 * @param {string} destintation - Contract Being Sent Too; Often Itself
 * @param {number} value - sFUEL to Sent
 * @param {BytesLike} data - The encoded function data to execute
 */
export interface IBaseTransaction {
    destination: string;
    value: BigNumber;
    data: BytesLike;
    gasLimit?: BigNumber;
}

/**
 * ITransaction
 * The type returned from a function when checking outcome
 * 
 * @param {boolean} executed - Whether it has been executed
 */
export interface ITransaction extends IBaseTransaction {
    executed: boolean;
}

/**
 * Used when function requires an input of a specific transaction id
 * 
 * @param {BigNumber} transactionId
 */
export interface ITransactionId {
    transactionId: BigNumber;
}

/**
 * Used for a specific functoin that checks total transcations based on status
 * 
 * @param {boolean} pending
 * @param {boolean} executed
 */
export interface ITransactionCount {
    pending: boolean;
    executed: boolean;
}

/**
 * Used to load transactionIds in a range based on from,to and status
 * 
 * @param {BigNumber} from
 * @param {BigNumber} to
 * @param {boolean} pending
 * @param {boolean} executed
 */
export interface ITransactionIds {
    from: BigNumber;
    to: BigNumber;
    pending: boolean;
    executed: boolean;
}

/**
 * Custom Interface Built for the Calling of Multisig specific functions
 * 
 * @param {MSGFunctions} function - the function being called
 * @param {any[]} values - additional values
 */
export interface IOnlyWalletFunction {
    function: MSGFunctions;
    values: any[];
}

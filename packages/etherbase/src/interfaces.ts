/**
 * 
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/etherbase
 * 
 * @file interfaces.ts
 * @author Sawyer Cutler
 * 
*/


import { BigNumber } from "ethers";

/**
 * Base Parameters for Functions that Have Optional Checks
 * 
 * @param {boolean?} runChecks - If Exists and True, Run Checks
 */
export interface IBaseParams {
    runChecks?: boolean;
}

/**
 * IFullCheck is used for the private client full check
 * 
 * @param {string} receiver - The receiver of Etherbase Withdrawl
 * @param {BigNumber} amount - The amount to withdraw from Etherbase
 */
export interface IFullCheck {
    receiver: string;
    amount: BigNumber;
}

/**
 * IRetrieve is used for when an attempt to retrieve all funds in Etherbase is made
 * 
 * @param {string} receiver - The receiver of Etherbase Withdraw
 */
export interface IRetrieve extends IBaseParams {
    receiver: string; 
}

/**
 * IPartiallyRetrieve is used for when an attempt to withdraw some funds from Etherbase is made
 * 
 * @param {string} receiver - The receiver of Etherbase Withdraw
 * @param {BigNumber} amount - The amount to retrieve
 */
export interface IPartiallyRetrieve extends IRetrieve {
    amount: BigNumber;
}

/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/marionette
 *
 * @file interfaces.ts
 * @author Sawyer Cutler
*/

import { BigNumber, BytesLike } from "ethers";

/**
 * IBase is the base parametes shared by both functions
 * 
 * @param {string} target - The contract marionette will call
 */
export interface IBase {
    target: string;
}
/**
 * IExecute contains the parameters when a wallet in control of marionette wants to execute a function
 * 
 * @param {BigNumber?} value - The amount of sFUEL to send. Defaults to 0
 * @param {BytesLike} data - The data to send which is most likely an encoded function call
 */
export interface IExecute extends IBase {
    value?: BigNumber;
    data: BytesLike
}

/**
 * ISendSFuel is the parameters for sending sFUEL via Marionette
 * 
 * @param {string} target - The amount of sFUEL to send
 */
export interface ISendSFuel extends IBase {
    value: BigNumber;
}
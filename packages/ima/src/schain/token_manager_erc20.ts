/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/ima
 *
 * @file contract.ts
 * @author Sawyer Cutler
*/

import { IInitParams } from "@skaleproject/utils";
import { TokenManager } from "./token_manager";
import { Address } from "@skaleproject/constants";
import {IMA_ABIs} from "@skaleproject/constants";

const IMA = Address.IMA;

/**
 * @class TokenManager
 */
export class TokenManagerERC20 extends TokenManager {
    
    /**
     * 
     * Initialization of the Abstract TokenManager Contract
     * This is a wrapper of the solidity smart contract 
     * 
     * @param {IInitParams} params - The core parameters passed into the constructor
     */
    constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? IMA.TOKEN_MANAGER_ERC20_ADDRESS,
            abi: params.abi ?? IMA_ABIs.TokenManagerERC20ABI
        });
    }

    /**
     * @param address - Address parameter being checked for clone status
     *
     * @description If the token is an clone on the chain i.e linked to another chain it will return true
     */
    public async isAddedClone(address: `0x${string}`) : Promise<boolean> {
        return await this.contract.callStatic.addedClones(address);
    }
}

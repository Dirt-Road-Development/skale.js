/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/context
 *
 * @file contract.ts
 * @author Sawyer Cutler
*/

import { Addresses } from "@skaleproject/constants/lib/addresses";
import ContextABI from "./abi.json";
import assert from "assert";
import { INewOwner } from "./interfaces";
import { BaseContract, IInitParams } from "@skaleproject/utils/lib/contracts/base_contract";
import { ContractReceipt, utils } from "ethers";

/**
 * @class Context
 */
export class Context extends BaseContract {
    
    /**
     * 
     * Initialization of the ConfigController Contract
     * This is a wrapper of the solidity smart contract 
     * 
     * @param {IInitParams} params - The core parameters passed into the constructor
     */
    constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_CONTEXT_ADDRESS,
            abi: params.abi ?? ContextABI
        });
    }

    /**
     * 
     * Gets name of schain
     * 
     * @function getSchainName
     * 
     * @returns {Promise<string>} - SKALE Chain Name
     * 
     */
    public async getSchainName() : Promise<string> {
        return await this.contract.getSchainName();
    }

    /**
     * 
     * Gets Schain Owner Address
     * 
     * @function getSchainOwnerAddress
     * 
     * @returns {Promise<string>} - owner address of schain
     */
    public async getSchainOwnerAddress() : Promise<string> {
        return await this.contract.getSchainOwnerAddress();
    }

    /**
     * 
     * Allows owner to update the owner address
     * 
     * @function setSchainOwnerAddress
     * 
     * @param {string} address - The new owner address
     * @returns ContractReceipt of the transaction
     */
    public async setSchainOwnerAddress({ address } : INewOwner) : Promise<ContractReceipt> {
        this.checkSigner();
        assert(utils.isAddress(address), "Invalid Ethereum  Address");
        const res = await this.contract.setSchainOwnerAddress(address);
        return res;
    }
}

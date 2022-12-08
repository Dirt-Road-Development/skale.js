/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/etherbase
 *
 * @file contract.ts
 * @author Sawyer Cutler
*/

import { Addresses } from "@skaleproject/constants/lib/addresses";
import EtherbaseABI from "./abi.json";
import { AccessControlEnumerable } from "@skaleproject/utils/lib/index";
import { BigNumber, ContractReceipt, utils } from "ethers";
import assert from "assert";
import {
    IFullCheck,
    IRetrieve,
    IPartiallyRetrieve
} from "./interfaces";
import { IInitParams } from "@skaleproject/utils/lib/contracts/base_contract";


/**
 * @class Etherbase
 */
export class Etherbase extends AccessControlEnumerable {

    public ETHER_MANAGER_ROLE: string = utils.id("ETHER_MANAGER_ROLE");

    /**
     * 
     * Initialization of the Etherbase Contract
     * This is a wrapper of the solidity smart contract 
     * 
     * @param {IInitParams} params - The core parameters passed into the constructor
     */
    constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_ETHERBASE_ADDRESS,
            abi: params.abi ?? EtherbaseABI
        });
    }
    
    /**
     * 
     * Wrapper for Solidity Function retrieve.
     * Allows requester to withdraw all funds from Etherbase to a specific address
     * Must have {ETHER_MANAGER_ROLE} to successfully call
     * Optional: Can optionally callRunChecks to run contract requirements on the client
     * 
     * @function retrieve
     * 
     * @param {IRetrieve} params - The retriever params
     * @returns {Promise<ContractReceipt>} Transaction Information
     * 
     * @public
     */
    public async retrieve(params: IRetrieve) : Promise<ContractReceipt> {
        assert(this.signer, "Contract: Does not have a Signer");
        if (params.runChecks) await this.onlyEtherManagerCheck();
        return await this.contract.retrieve(params.receiver);
    }

    /**
     * 
     * Wrapper for Solidity Function partiallyRetreive. Allows requester to withdraw a specific amount of sFUEL to a specific address.
     * Must have {ETHER_MANAGER_ROLE} to successfully call
     * Optional: Can optionally callRunChecks to run contract requirements on the client
     *
     * @function partiallyRetreive
     * 
     * @param {IPartiallyRetrieve} params - The retriever params
     * @returns {Promise<ContractReceipt>} Transaction Information
     * 
     * @public
     */
    public async partiallyRetrieve(params: IPartiallyRetrieve) : Promise<ContractReceipt> {
        assert(this.signer, "Contract: Does not have a Signer");
        if (params.runChecks) {
            await this.fullCheck({ ...params });
            await this.onlyEtherManagerCheck();
        }
        
        return await this.contract.partiallyRetrieve(params.receiver, params.amount);
    }
    
    /**
     * 
     * Internal Async Function check to see whether the signer has ETHER_MANAGER_ROLE
     * 
     * @function onlyEtherManagerCheck
     * 
     * @private
     */
    private async onlyEtherManagerCheck() : Promise<void> {
        const signer = this.contract.signer;
        const address: string = await signer.getAddress();
        const isEtherManager: boolean = await this.isEtherManager(address);
        assert(isEtherManager, "Etherbase: Not ETHER_MANAGER_ROLE");
    }

    /**
     * 
     * Internal Async Function Check to see if input values are acceptable
     * 
     * @function onlyEtherManagerCheck
     * 
     * @param {IFullCheck} params - Full Check Params Contains address check and amount chec
     * @private
     */
    private async fullCheck(params: IFullCheck) : Promise<void> {
        assert(utils.isAddress(params.receiver), "Contract: Invalid Ethereum Address Param");
        const contractBalance: BigNumber = await this.contract.provider.getBalance(this.contract.address);
        assert(params.amount.lte(contractBalance), "Contract: Insufficient Funds to Retrieve");
    }

    /**
     * 
     * Internal Function to check if address has ETHER_MANAGER_ROLE
     * 
     * @function isEtherManager
     * 
     * @param {string} address - Address to Check
     * @returns {boolean} Has Ether Manager Role
     */
    private async isEtherManager(address: string) : Promise<boolean> {
        return await this.contract.callStatic.hasRole(this.ETHER_MANAGER_ROLE, address);
    }
}

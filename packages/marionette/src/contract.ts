/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/marionette
 *
 * @file contract.ts
 * @author Sawyer Cutler
*/


import { Address } from "@skaleproject/constants";
import { AccessControlEnumerable, IInitParams } from "@skaleproject/utils";
import { BytesLike, constants, ContractReceipt, utils } from "ethers";
import MarionetteABI from "./abi.json";
import { IExecute, ISendSFuel } from "./interfaces";

const Addresses = Address.Addresses;

/**
 * @contract Marionette
 */
export class Marionette extends AccessControlEnumerable {
    
    public IMA_ROLE: string = utils.id("IMA_ROLE");
    public PUPPETEER_ROLE: string = utils.id("PUPPETEER_ROLE");


    /**
     * 
     * Initialization of the Marionette Contract
     * This is a wrapper of the solidity smart contract 
     * 
     * @param {IInitParams} params - The core parameters passed into the constructor
     */
     constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_MARIONETTE_ADDRESS,
            abi: params.abi ?? MarionetteABI
        });
    }


    /**
     * 
     * Wrapper for Solidity Function execute. Allows Marionette to call other contracts. 
     * Highly Valuable on MULTISIG Chain Creation as Originator can control marionette which controls the chain.
     * Must have {PUPPETEER_ROLE} to successfully call
     * 
     * @function execute
     * 
     * @param {IExecute} params - IExecute contains the target destination, value (sFUEL), and data to be executed by marionette
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
     */
    public async execute(params: IExecute) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.execute(
            params.target,
            params.value ?? constants.Zero,
            params.data
        );
    }

    /**
     * 
     * Wrapper for Solidity Function sendSFuel. Sends sFUEL to Target.
     * Must have {PUPPETEER_ROLE} to successfully call
     * 
     * @function sendSFuel
     * 
     * @param {ISendSFuel} params - ISendSFuel contains the target and amount to send
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
     */
    public async sendSFuel(params: ISendSFuel) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.sendSFuel(
            params.target,
            params.value
        );
    }

    /**
     * 
     * Wrapper for Solidity Function execute. 
     * Must have {PUPPETEER_ROLE} to successfully call
     * 
     * @function execute
     * 
     * @param {IExecute} params - IExecute contains the target destination, value (sFUEL), and data to be executed by marionette
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
     */
    public async encodeFunctionCall(params: IExecute) : Promise<BytesLike> {
        this.checkSigner();
        return await this.contract.encodeFunctionCall(
            params.target,
            params.value ?? constants.Zero,
            params.data
        );
    }
}
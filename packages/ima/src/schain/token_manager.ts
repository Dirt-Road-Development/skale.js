/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/ima
 *
 * @file contract.ts
 * @author Sawyer Cutler
*/

import { IInitParams } from "@skaleproject/utils/lib/contracts/base_contract";
import { BytesLike, utils } from "ethers";
import {AccessControlEnumerable} from "@skaleproject/utils";

/**
 * @class TokenManager
 */
export class TokenManager extends AccessControlEnumerable {
    
    public AUTOMATIC_DEPLOY_ROLE = utils.id("AUTOMATIC_DEPLOY_ROLE");
    public TOKEN_REGISTRAR_ROLE = utils.id("TOKEN_REGISTRAR_ROLE");

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
            address: params.address,
            abi: params.abi
        });
    }
    
    /**
     * @function getMainnetName
     * @return {Promise<string>} value of mainnet
     *
     * Should always return Mainnet
     */
    public async getMainnetName() : Promise<string> {
        return await this.contract.callStatic.MAINNET_NAME();
    }

    /**
     *
     * @function getMainnetHash
     * @return {Promise<BytesLike>} value of mainnet hash
     */
    public async getMainnetHash() : Promise<BytesLike> {
        return await this.contract.callStatic.MAINNET_HASH();
    }
    
    /**
     *
     * @function getMessageProxyForSchain
     * @return {Promise<`0x${string}`>} Address of MessageProxyForSchain
     */
    public async getMessageProxyForSchain() : Promise<`0x${string}`> {
        return await this.contract.callStatic.messageProxy();
    }

    /**
     * 
     * @function getTokenManagerLinker
     * @return {Promise<`0x${string}`>} Address of TokenManagerLinker
     */
    public async getTokenManagerLinker() : Promise<`0x${string}`> {
        return await this.contract.callStatic.tokenManagerLinker();
    }

    /**
     *
     * @function communityLocker
     * @return {Promise<`0x{string}`> Address of CommunityLocker
     */
    public async getCommunityLocker() : Promise<`0x${string}`> {
        return await this.contract.callStatic.communityLocker();
    }

    /**
     *
     * @function getSchainHash
     * @return {Promise<BytesLike>} Keccack256 of schain name
     */
    public async getSchainHash() : Promise<BytesLike> {
        return await this.contract.callStatic.schainHash();
    }

    /**
     *
     * @function getDepositBox
     * @return {Promise<`0x${string}`>} Address of DepositBox
     */
    public async getDepositBox() : Promise<`0x${string}`> {
        return await this.contract.callStatic.depositBox();
    }

    /**
     * @function getAutomaticDeploy
     * @return {Promise<`0x${string}`> Address of Automatic Deploy
     */
    public async getAutomaticDeploy() : Promise<`0x${string}`> {
        return await this.contract.callStatic.automaticDeploy();
    }

    /**
     * @function getTokenManager
     * @param {BytesLike} sChainHash of Other SKALE Chain
     * @returns {Promise<`0x${string}`>} Address of TokenManager of Connected Chain
     */
    public async tokenManagers(sChainHash: BytesLike) : Promise<`0x${string}`> {
        return await this.contract.callStatic.tokenManagers(sChainHash);
    }

    // TODO - enableAutomaticDeploy
    // TODO - disableAutomaticDeploy
    // TODO - addTokenManager
    // TODO - removeTokenManager
    // TODO - changeDepositBoxAddress
    // TODO - hasTokenManager
}

/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/config-controller
 *
 * @file contract.ts
 * @author Sawyer Cutler
*/

import { AccessControlEnumerable } from "@skaleproject/utils";
import { Address } from "@skaleproject/constants";
import assert from "assert";
import ConfigControllerABI from "./abi.json";
import { ContractReceipt } from "@ethersproject/contracts";
import { IInitParams } from "@skaleproject/utils";
import {
    IDefault,
    IVersion,
    IWhitelist
} from "./interfaces";
import { id, isAddress } from "ethers/lib/utils";

const Addresses = Address.Addresses;

/**
 * @class ConfigController
 */
export class ConfigController extends AccessControlEnumerable {

    
    public DEPLOYER_ADMIN_ROLE: string = id("DEPLOYER_ADMIN_ROLE");
    public DEPLOYER_ROLE: string = id("DEPLOYER_ROLE");
    public MTM_ADMIN_ROLE: string = id("MTM_ADMIN_ROLE");

    /**
     * 
     * @param params - The core contract params for client interaction 
     * Wrapper of the ConfigController Solidity Contract
     * 
     */
    constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_CONFIG_CONTROLLER_ADDRESS,
            abi: params.abi ?? ConfigControllerABI
        });
    }

    /**
     * 
     * @param params - IWhitelist contains the address to whitelist and the checkParams flag
     *
     * Wrapper for Solidity Function addToWhitelist. Utilizes grantRole under the hood
     * Must have DEPLOYER_ADMIN_ROLE to successfully call
     * Optional: Can optionally call runChecks to run contract requirements on the client
     * 
     */
    public async addToWhitelist(params: IWhitelist) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params.runChecks) {
            assert(isAddress(params.address), "Invalid Ethereum Address");
            const hasDeployerAdminRole: boolean = await this.hasRole({ role: this.DEPLOYER_ADMIN_ROLE, account: this.signerAddr });
            assert(hasDeployerAdminRole, "ConfigController: Signer does not have DEPLOYER_ADMIN_ROLE");
        }

        return await this.contract.addToWhitelist(params.address);
    }

    /**
     * 
     * Wrapper for Solidity Function removeFromWhitelist. Utilizes grantRole under the hood
     * Must have {DEPLOYER_ADMIN_ROLE} to successfully call
     * Optional: Can optionally call runChecks to run contract requirements on the client
     * 
     * @function removeFromWhitelist
     * 
     * @param {IWhitelist} params - IWhitelist contains the address to whitelist and the checkParams flag
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
    */
    public async removeFromWhitelist(params: IWhitelist) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params.runChecks) {
            assert(isAddress(params.address), "Invalid Ethereum Address");
            const hasDeployerAdminRole: boolean = await this.hasRole({ role: this.DEPLOYER_ADMIN_ROLE, account: this.signerAddr });
            assert(hasDeployerAdminRole, "ConfigController: Signer does not have DEPLOYER_ADMIN_ROLE");
        }
        return await this.contract.removeFromWhitelist(params.address);
   }

    /**
     * 
     * Wrapper for Solidity Function isFCDEnabled
     * 
     * @function isFCDEnabled
     *
     * @returns {boolean} Whether Free Contract Deployment is Enabled
     * 
     * @public
    */
    public async isFCDEnabled() : Promise<boolean> {
        return await this.contract.callStatic.isFCDEnabled();
    }
    
    /**
     * 
     * Wrapper for Solidity Function isAddressWhitelisted
     * If Address is Contract -> True
     * If Whitelisted         -> True
     * Else                   -> False
     * 
     * @function isAddressWhitelisted
     *
     * @param {string} address - The Address to Check
     * @returns {boolean} If Address is whitelisted
     * 
     * @public
    */
    public async isAddressWhitelisted({ address }: { address: string }) : Promise<boolean> {
        assert(isAddress(address), "Address it not a valid Ethereum Address");
        return await this.contract.isAddressWhitelisted(address);
    }
    
    /**
     * 
     * Wrapper for Solidity Function isMTMEnabled
     * 
     * @function isMTMEnabled
     *
     * @returns {boolean} Whether Multi-Transaction Mode is Enabled
     * 
     * @public
    */
    public async isMTMEnabled() : Promise<boolean> {
        return await this.contract.callStatic.isMTMEnabled();
    }

    /**
     * 
     * Wrapper for Solidity Function enableMTM 
     * 
     * @function enableMTM
     *
     * @param {IDefault?} params - Optional Params. If Params are set with runChecks it will run client checks to confirm 
     *                             proper roles are owned by the user and that mtm is currently disabled
     *  
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
    */
    public async enableMTM(params?: IDefault) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params && params.runChecks) await this.mtmChecks({ isEnable: true });
        try {
            return await this.contract.enableMTM();
        } catch (err) {
            throw err;
        }
    }

/**
     * 
     * Wrapper for Solidity Function disableMTM 
     * 
     * @function disableMTM
     *
     * @param {IDefault?} params - Optional Params. If Params are set with runChecks it will run client checks to confirm 
     *                             proper roles are owned by the user and that mtm is currently enabled
     *  
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
    */
    public async disableMTM(params?: IDefault) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params?.runChecks) await this.mtmChecks({ isEnable: false });

        try {
            return await this.contract.disableMTM();
        } catch (err) {
            throw err;
        }
    }

    /**
     * 
     * Wrapper for Solidity Function enableFreeContractDeployment
     * 
     * @function enableFreeContractDeployment
     *
     * @param {IDefault?} params - Optional Params. If Params are set with runChecks it will run client checks to confirm 
     *                             proper roles are owned by the user and that fcd is currently disabled
     *  
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
    */
    public async enableFreeContractDeployment(params?: IDefault) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params?.runChecks) await this.fcdChecks({ isEnable: true });

        try {
            return await this.contract.enableFreeContractDeployment();
        } catch (err) {
            throw err;
        }
    }

    /**
     * 
     * Wrapper for Solidity Function enableFreeContractDeployment
     * 
     * @function disableFreeContractDeployment
     *
     * @param {IDefault?} params - Optional Params. If Params are set with runChecks it will run client checks to confirm 
     *                             proper roles are owned by the user and that fcd is currently enabled 
     *  
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
    */
    public async disableFreeContractDeployment(params?: IDefault) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params?.runChecks) await this.fcdChecks({ isEnable: false });

        try {
            return await this.contract.disableFreeContractDeployment();
        } catch (err) {
            throw err;
        }
    }

    /**
     * 
     * Wrapper for Solidity Function setVersion
     * 
     * @function setVersion
     *
     * @param {IDefault} params - Core Params 
     *  
     * @returns {ContractReceipt} Transaction Information
     * 
     * @public
    */
    public async setVersion(params: IVersion) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params.runChecks) {
            const hasDefaultAdminRole: boolean = await this.hasRole({ role: this.DEFAULT_ADMIN_ROLE, account: this.signerAddr });
            assert(hasDefaultAdminRole, "ConfigController: Signer Does not have DEFAULT_ADMIN_ROLE");
        }
        
        try {
            return await this.contract.setVersion(params.version);
        } catch (err) {
            throw err;
        }
    }

    /**
     * 
     * Internal Function Utilized to Run Pre MTM Flip Checks
     * 
     * @function mtmChecks
     *
     * @param {boolean} isEnable - Whether Callers Plans to Enable (True) or Disable(False) MTM Mode
     *  
     * @returns {Promise<void>} This function does not return anything
     * 
     * @private
     * 
    */
    private async mtmChecks({ isEnable }: { isEnable: boolean }) : Promise<void> {
        const signer = this.contract.signer;
        const address = await signer.getAddress();
        const hasRole: boolean = await this.hasRole({ role: this.MTM_ADMIN_ROLE, account: address });
        assert(hasRole, "ConfigController: Does Not have MTM_ADMIN_ROLE")
        const isMTMEnabled: boolean = await this.isMTMEnabled();
        assert(isEnable !== isMTMEnabled, isEnable ? "MTM Already Enabled" : "MTM Already Disabled");
    }

    /**
     * 
     * Internal Function Utilized to Run Pre FCD Flip Checks
     * 
     * @function fcdChecks
     *
     * @param {boolean} isEnable - Whether Callers Plans to Enable (True) or Disable(False) Free Contract Deployment
     *  
     * @returns {Promise<void>} This function does not return anything
     * 
     * @private
     * 
    */
    private async fcdChecks({ isEnable }: { isEnable: boolean }) : Promise<void> {
        const hasRole: boolean = await this.hasRole({ role: this.DEPLOYER_ADMIN_ROLE, account: this.signerAddr });
        assert(hasRole, "ConfigController: Does not have DEPLOYER_ADMIN_ROLE");
        const isFCDEnabled: boolean = await this.isFCDEnabled();
        assert(isEnable !== isFCDEnabled, isEnable ? "FCD Already Enabled" : "FCD Already Disabled");
    }
}

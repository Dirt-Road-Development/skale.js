import { Addresses } from "@skaleproject/constants/lib/addresses";
import ConfigControllerABI from "./abi.json";
import { IInitParams } from "@skaleproject/utils/lib/contract";
import { ContractReceipt, utils } from "ethers";
import { AccessControlEnumerable } from "@skaleproject/utils/lib/contracts";
import { assert } from "console";

interface IDefault {
    runChecks: boolean;
}

interface IWhitelist extends IDefault {
    address: string;
}

interface IVersion extends IDefault {
    version: string;
}

export class ConfigController extends AccessControlEnumerable {

    public DEPLOYER_ADMIN_ROLE: string = utils.id("ETHER_MANAGER_ROLE");
    public DEPLOYER_ROLE: string = utils.id("DEPLOYER_ROLE");
    public MTM_ADMIN_ROLE: string = utils.id("MTM_ADMIN_ROLE");
    /**
     * 
     * @param params
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
     * @description Allow Address to deploy smart contracts on your SKALE Chain
     * @function addToWhitelist
     * @param params 
     * @return ContractReceipt
     * @public
    **/
     public async addToWhitelist(params: IWhitelist) : Promise<ContractReceipt> {
        // console.log("SIGNER");
        // console.log(this.signer);
        // assert(this.signer, "Contract: Does not have a Signer");
        this.checkSigner();
        if (params.runChecks) {
            assert(utils.isAddress(params.address), "Invalid Ethereum Address");
            const hasDeployerAdminRole: boolean = await this.hasRole({ role: this.DEPLOYER_ADMIN_ROLE, account: this.signer.address });
            assert(hasDeployerAdminRole, "ConfigController: Signer does not have DEPLOYER_ADMIN_ROLE");
        }
        try {
            return await this.contract.addToWhitelist(params.address);
        } catch (err) {
            throw err;
        }
   }

       /**
     * 
     * @description Block Address from deploying smart contracts on your SKALE Chain
     * @function removeFromWhitelist
     * @param params
     * @return ContractReceipt
     * @public
    **/
    public async removeFromWhitelist(params: IWhitelist) : Promise<ContractReceipt> {
        assert(this.signer, "Contract: Does not have a Signer");
        if (params.runChecks) {
            assert(utils.isAddress(params.address), "Invalid Ethereum Address");
            const hasDeployerAdminRole: boolean = await this.hasRole({ role: this.DEPLOYER_ADMIN_ROLE, account: this.signer.address });
            assert(hasDeployerAdminRole, "ConfigController: Signer does not have DEPLOYER_ADMIN_ROLE");
        }
        try {
            return await this.contract.removeFromWhitelist(params.address);
        } catch (err) {
            throw err;
        }
   }

    /**
     * 
     * @function isFCDEnabled
     * @returns boolean
     * @public
    **/
    public async isFCDEnabled() : Promise<boolean> {
        return await this.contract.callStatic.isFCDEnabled();
    }
    
    public async isAddressWhitelisted({ address }: { address: string }) : Promise<boolean> {
        assert(utils.isAddress(address), "Address it not a valid Ethereum Address");
        return await this.contract.isAddressWhitelisted(address);
    }
    /**
     * 
     * @function isMTMEnabled
     * @returns boolean
     * @public
     * 
    **/
    public async isMTMEnabled() : Promise<boolean> {
        return await this.contract.callStatic.isMTMEnabled();
    }

    /**
     * 
     * @function enableMTM
     * @param params
     * @returns ContractReceipt
     * @public
     * 
    **/
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
     * @function disableMTM
     * @param params
     * @returns ContractReceipt
     * @public
     * 
    **/ 
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
     * @function enableFreeContractDeployment
     * @returns ContractReceipt
     * @public
     * 
    **/
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
     * @function disableFreeContractDeployment
     * @returns ContractReceipt
     * @public
     * 
    **/
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
     * @function setVersion
     * @param params
     * @return ContractReceipt
     * @public
    **/
    public async setVersion(params: IVersion) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params.runChecks) {
            const hasDefaultAdminRole: boolean = await this.hasRole({ role: this.DEFAULT_ADMIN_ROLE, account: this.signer.address });
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
     * @function mtmChecks
     * @param isEnable
     * @private
     * 
     */
    private async mtmChecks({ isEnable }: { isEnable: boolean }) : Promise<void> {
        const signer = this.contract.signer;
        const address = await signer.getAddress();
        const hasRole: boolean = await this.hasRole({ role: this.MTM_ADMIN_ROLE, account: address });
        console.log("MTM HAS ROLE: ", hasRole);
        assert(hasRole, "ConfigController: Does Not have MTM_ADMIN_ROLE")
        const isMTMEnabled: boolean = await this.isMTMEnabled();
        console.log("MTM Enable: ", isEnable);
        console.log("Status: ", isMTMEnabled);
        assert(isEnable !== isMTMEnabled, isEnable ? "MTM Already Enabled" : "MTM Already Disabled");
    }

    /**
     * 
     * @function fcdChecks
     * @param isEnable
     * @private
     * 
    **/
    private async fcdChecks({ isEnable }: { isEnable: boolean }) : Promise<void> {
        const hasRole: boolean = await this.hasRole({ role: this.DEPLOYER_ADMIN_ROLE, account: this.signer.address });
        assert(hasRole, "ConfigController: Does not have DEPLOYER_ADMIN_ROLE");
        const isFCDEnabled: boolean = await this.isFCDEnabled();
        assert(isEnable !== isFCDEnabled, isEnable ? "FCD Already Enabled" : "FCD Already Disabled");
    }
}
import { Addresses } from "@skaleproject/constants/lib/addresses";
import ContextABI from "./abi.json";
import assert from "assert";
import { INewOwner } from "./interfaces";
import { BaseContract, IInitParams } from "@skaleproject/utils/lib/contracts/base_contract";
import { ContractReceipt, utils } from "ethers";

export class Context extends BaseContract {

    constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_CONTEXT_ADDRESS,
            abi: params.abi ?? ContextABI
        });
    }

    /**
     * 
     * @returns string -> SKALE Chain Name
     * @description This value is set when predeployed
     */
    public async getSchainName() : Promise<string> {
        return await this.contract.getSchainName();
    }

    /**
     * 
     * @returns string -> owner address
     * @description This value can be changed, but is set to Marionette by Deafult
     */
    public async getSchainOwnerAddress() : Promise<string> {
        return await this.contract.getSchainOwnerAddress();
    }

    /**
     * 
     * @param params -> The Owner address replacement value
     * @returns ContractReceipt of the transaction
     */
    public async setSchainOwnerAddress(params: INewOwner) : Promise<ContractReceipt> {
        this.checkSigner();
        assert(utils.isAddress(params.address), "Invalid Ethereum  Address");
        const res = await this.contract.setSchainOwnerAddress(params.address);
        return res;
    }
}

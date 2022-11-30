import { Addresses } from "@skaleproject/constants/lib/addresses";
import EtherbaseABI from "./abi.json";
import { Contract } from "@skaleproject/utils/lib/index";
import { BigNumber, utils } from "ethers";
import assert from "assert";
import {
    IFullCheckParams,
    IRetrieveParams,
    IPartiallyRetrieveParams
} from "./interfaces";
import { IInitParams } from "@skaleproject/utils/lib/contracts/base_contract";

export class Etherbase extends Contract.AccessControlEnumerable {

    public ETHER_MANAGER_ROLE: string = utils.id("ETHER_MANAGER_ROLE");

    constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_ETHERBASE_ADDRESS,
            abi: params.abi ?? EtherbaseABI
        });
    }
     
    public async retrieve(params: IRetrieveParams) {
        /// TODO -> Assert Change Contract to Constant via Lib after NPM Push
        assert(this.signer, "Contract: Does not have a Signer");
        if (params.runChecks === true) {
            await this.onlyEtherManagerChecks();
        }
        try {
            const response = await this.contract.retrieve(params.receiver);
            return response;
        } catch (err) {
            throw err;
        }
    }

    public async partiallyRetrieve(params: IPartiallyRetrieveParams) {
        /// TODO -> Assert Change Contract to Constant via Lib after NPM Push
        assert(this.signer, "Contract: Does not have a Signer");
        if (params.runChecks === true) {
            await this.fullCheck({ ...params });
            await this.onlyEtherManagerChecks();
        }
        
        try {
            const response = await this.contract.functions["partiallyRetrieve"]([params.receiver, params.amount])
            return response;
        } catch (err) {
            throw err;
        }
    }

    private async onlyEtherManagerChecks() : Promise<void> {
        const signer = this.contract.signer;
        const address: string = await signer.getAddress();
        const isEtherManager: boolean = await this.isEtherManager(address);
        assert(isEtherManager, "Etherbase: Not ETHER_MANAGER_ROLE");
    }

    private async fullCheck({ receiver, amount }: IFullCheckParams) : Promise<void> {
        assert(utils.isAddress(receiver), "Contract: Invalid Ethereum Address Param");
        const contractBalance: BigNumber = await this.contract.provider.getBalance(this.contract.address);
        assert(amount.lte(contractBalance), "Contract: Insufficient Funds to Retrieve");
    }

    private async isEtherManager(address: string) : Promise<boolean> {
        return await this.contract.callStatic.hasRole(this.ETHER_MANAGER_ROLE, address);
    }
}

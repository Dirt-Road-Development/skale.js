import { Addresses } from "@skaleproject/constants/lib/addresses";
import { AccessControlEnumerable, IInitParams } from "@skaleproject/utils";
import { constants, ContractReceipt, utils } from "ethers";
import MarionetteABI from "./abi.json";
import { IExecute, ISendSFuel } from "./interfaces";

export class Marionette extends AccessControlEnumerable {
    
    public IMA_ROLE: string = utils.id("IMA_ROLE");
    public PUPPETEER_ROLE: string = utils.id("PUPPETEER_ROLE");

    /**
     * 
     * @param params
     *
     */
     constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_MARIONETTE_ADDRESS,
            abi: params.abi ?? MarionetteABI
        });
    }

    public async execute(params: IExecute) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.execute(
            params.target,
            params.value ?? constants.Zero,
            params.data
        );
    }

    public async sendSFuel(params: ISendSFuel) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.sendSFuel(
            params.target,
            params.value
        );
    }

    public async encodeFunctionCall(params: IExecute) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.execute(
            params.target,
            params.value ?? constants.Zero,
            params.data
        );
    }
}
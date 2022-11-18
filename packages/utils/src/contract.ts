import { Contract, providers } from "ethers";
import { Interface } from "ethers/lib/utils";

export class BaseContract {
    
    public contract: Contract;

    constructor(address: string, provider: providers.Provider, abi: Interface) {
        this.contract = new Contract(address, abi, provider);
    }

    public getAddress() : string {
        return this.contract.address;
    }

    public getInterface() : Interface {
        return this.contract.interface;
    }

    public getCallStaticFns() {
        return this.contract.callStatic;
    }
}

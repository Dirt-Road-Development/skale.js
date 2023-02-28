import assert from "assert";
import { Contract, providers, Signer } from "ethers";

export interface IBaseContractParams {
    address: string;
    abi: any;
}

export interface IParams {
    signer: providers.Web3Provider | providers.JsonRpcSigner | Signer;
}


export interface IInjectedParams extends IParams {
    address?: string;
    abi?: any;
}

export interface IContractParams extends IInjectedParams {}
    
export class InjectedContract {

    public contract: Contract;
    protected signer: providers.Web3Provider | providers.JsonRpcSigner | Signer;
    protected hasSigner: boolean = false;

    constructor(params: IContractParams) {        
        this.signer = params.signer;
        this.contract = new Contract(
            params.address,
            params.abi,
            params.signer
        );
    }

    public checkSigner() : void {
        assert(this.hasSigner, "Contract: Not a valid Signer");
    }
    
    private getEvents() : string[] {
        return Object.keys(this.contract.filters);
    }

    public getEventNames({ nameOnly = true }: { nameOnly?: boolean }) {
        const names: string[] = [];
        const funcs: string[] = [];
        
        this.getEvents().forEach((event: string) => {
            funcs.push(event);
            names.push(event.split("(")[0]);
        });

        return nameOnly ? names : funcs;
    }
}

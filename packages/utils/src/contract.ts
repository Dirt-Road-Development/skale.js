import assert from "assert";
import { Contract, providers, Wallet } from "ethers";

export interface IBaseContractParams {
    address: string;
    abi: any;
}

export interface IParams {
    rpcUrl: string;
    wsUrl?: string;
    signer?: providers.Web3Provider | Wallet;
}


export interface IInitParams extends IParams {
    address?: string;
    abi?: any;
}

export interface IContractParams extends IParams, IBaseContractParams {}
    
export class BaseContract {

    protected hasSigner: boolean;
    public contract: Contract;

    constructor(params: IContractParams) {
        let provider: providers.Provider | Wallet;

        if (params.signer) {
            this.hasSigner = true;
            provider = params.signer;
        } else if (params.wsUrl) {
            assert(params.wsUrl.includes(("ws")), "Invalid Websocket Url");
            this.hasSigner = false;
            provider = new providers.WebSocketProvider(params.wsUrl);     
        } else {
            this.hasSigner = false;
            provider = new providers.JsonRpcProvider(params.rpcUrl);
        }
        
        this.contract = new Contract(
            params.address,
            params.abi,
            provider
        );
    }

    public isWriteableProvider() : void {
        assert(this.hasSigner, "Provider cannot write");
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

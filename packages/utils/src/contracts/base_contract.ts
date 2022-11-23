import assert from "assert";
import { Contract, providers, Wallet } from "ethers";

export interface IBaseContractParams {
    address: string;
    abi: any;
}

export interface IParams {
    rpcUrl: string;
    wsUrl?: string;
    signer?: Wallet;
}


export interface IInitParams extends IParams {
    address?: string;
    abi?: any;
}

export interface IContractParams extends IParams, IBaseContractParams {}
    
export class BaseContract {

    public contract: Contract;
    protected signer: Wallet | undefined;

    constructor(params: IContractParams) {
        let provider: providers.Provider | Wallet;
        if (params.signer) {
            this.signer = params.signer;
            provider = params.signer;
            
        } else if (params.wsUrl) {
            assert(params.wsUrl.includes(("ws")), "Invalid Websocket Url");
            provider = new providers.WebSocketProvider(params.wsUrl);     
        } else {
            provider = new providers.JsonRpcProvider(params.rpcUrl);
        }
        
        this.contract = new Contract(
            params.address,
            params.abi,
            provider
        );
    }

    public isWriteableProvider() : void {
        assert(this.signer, "Provider cannot write");
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

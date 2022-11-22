import { BigNumber } from "ethers";

export interface IBaseParams {
    runChecks?: boolean;
}

export interface IFullCheckParams {
    receiver: string;
    amount: BigNumber;
}

export interface IRetrieveParams extends IBaseParams {
    receiver: string; 
}


export interface IPartiallyRetrieveParams extends IRetrieveParams {
    amount: BigNumber;
}

import { BigNumber, BytesLike } from "ethers";

export interface IBase {
    target: string;
}

export interface IExecute extends IBase {
    value?: BigNumber;
    data: BytesLike
}

export interface ISendSFuel extends IBase {
    value: BigNumber;
}
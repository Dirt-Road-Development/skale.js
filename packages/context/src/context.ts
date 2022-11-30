import { Addresses } from "@skaleproject/constants/lib/addresses";
import ContextABI from "./abi.json";
import { Contract } from "@skaleproject/utils/lib/index";
// import { BigNumber, utils } from "ethers";
// import assert from "assert";
import {
} from "./interfaces";
import { IInitParams } from "@skaleproject/utils/lib/contracts/base_contract";

export class Context extends Contract.AccessControlEnumerable {

    constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_CONTEXT_ADDRESS,
            abi: params.abi ?? ContextABI
        });
    }
}

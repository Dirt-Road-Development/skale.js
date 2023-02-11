import { Contract } from "@ethersproject/contracts";
import { BN } from "bn.js/index";
import { InjectedContractParams, ContractTransactionParams } from "./types";
import { BigNumber } from "@ethersproject/bignumber";

import InjectedPow from "./injected";

export default class InjectedPowContract extends InjectedPow {
    private contract: Contract;

    constructor(params: InjectedContractParams) {
        super({ ...params });
        this.contract = new Contract(params.address, params.abi, this.provider);
    }

    
    public async encodeAndSend(params: ContractTransactionParams) {

        const signer = this.provider.getSigner();

        let nonce = await signer.getTransactionCount();
        let gas = new BN(params.gas ?? 100000);
        const mineFreeGasResult = await this.miner.mineGasForTransaction(nonce, gas, signer._address);

        return await signer.sendTransaction({
            from: signer._address,
            to: this.contract.address,
            data: this.contract.interface.encodeFunctionData(
                params.functionName,
                params.functionArgs
            ),
            nonce,
            gasPrice: BigNumber.from(mineFreeGasResult),
        });
    }

}
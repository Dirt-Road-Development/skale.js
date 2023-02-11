import { Contract } from "@ethersproject/contracts";
import { BN } from "bn.js/index";
import AnonymousPoW from "./anonymous";
import { AnonymousContractParams, ContractTransactionParams } from "./types";
import { BigNumber } from "@ethersproject/bignumber";

export default class AnonymousPoWContract extends AnonymousPoW {

    private contract: Contract;

    constructor(params: AnonymousContractParams) {
        super({ ...params });
        this.contract = new Contract(params.address, params.abi, this.provider);
    }

    
    public async encodeAndSend(params: ContractTransactionParams) {

        let nonce = await this.wallet.getTransactionCount();
        let gas = new BN(params.gas ?? 100000);

        const mineFreeGasResult = await this.miner.mineGasForTransaction(nonce, gas, this.wallet.address);

        return await this.wallet.sendTransaction({
            from: this.wallet.address,
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
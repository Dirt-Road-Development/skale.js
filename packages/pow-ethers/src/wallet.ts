import assert from "assert";
import { utils, BigNumber, Wallet } from "ethers";
import BaseMiner from "./miner";
import { EncodeSendParams, TransactionParams, WalletParams } from "./types";

export default class WalletPow extends BaseMiner {

	protected wallet: Wallet;

	constructor(params: WalletParams) {
			super();
			assert(params.wallet.provider._isProvider, "Wallet does not have a provider");
			this.wallet = params.wallet;
	}

	public async send(params: TransactionParams) {

		const { to, data } = params;

		let nonce: number = await this.wallet.getTransactionCount();
		let gas: number = params.gas ?? 100000;
		const mineFreeGasResult = await this.mineGasForTransaction(nonce, gas, this.wallet.address);

		return await this.wallet.sendTransaction({
			from: this.wallet.address,
			to,
			data,
			nonce,
			gasPrice: BigNumber.from(mineFreeGasResult)
		}) 
	}

	public async encodeAndSend(params: EncodeSendParams) {
	
		const { abi, functionArgs, functionName} = params;
		
		const contractInterface = new utils.Interface(abi);
		const data = contractInterface.encodeFunctionData(functionName, functionArgs);

		return await this.send({ ...params, data });
	}
}
		
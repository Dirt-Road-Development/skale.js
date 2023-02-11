import { Wallet } from "@ethersproject/wallet";
import { JsonRpcProvider, } from "@ethersproject/providers";
import SkalePowMiner from "@skaleproject/pow/src/index";
import BN from "bn.js/index";
import { Interface } from "ethers/lib/utils";
import { AnonymousParams, TransactionParams, EncodeSendParams } from "./types";
import { BigNumber } from "@ethersproject/bignumber";

export default class AnonymousPoW {
  
  protected provider: JsonRpcProvider;
  protected miner: SkalePowMiner;
  protected wallet: Wallet;

  constructor(params: AnonymousParams) {
    this.miner = new SkalePowMiner({ difficulty: params.difficulty });
    this.provider = new JsonRpcProvider(params.rpcUrl);
    this.wallet = Wallet.createRandom().connect(this.provider);
  }
  
  public async send(params: TransactionParams) {

    const { to, data } = params;

    let nonce = await this.wallet.getTransactionCount();
    let gas = new BN(100000);
    const mineFreeGasResult = await this.miner.mineGasForTransaction(nonce, gas, this.wallet.address);

    return await this.wallet.sendTransaction({
      from: this.wallet.address,
      to,
      data,
      nonce,
      gasPrice: BigNumber.from(mineFreeGasResult),
    }) 
  }

  public async encodeAndSend(params: EncodeSendParams) {
  
    const { abi, functionArgs, functionName} = params;
    
    const contractInterface = new Interface(abi);
    const data = contractInterface.encodeFunctionData(functionName, functionArgs);

    return await this.send({ ...params, data });

  }
}


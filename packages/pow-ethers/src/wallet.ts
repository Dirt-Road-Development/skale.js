import { Wallet } from "@ethersproject/wallet";
import SkalePowMiner from "@skaleproject/pow/src";
import assert from "assert";
import { BN } from "bn.js";
import { BigNumber } from "ethers";
import { Interface } from "ethers/lib/utils";
import BaseMiner from "./miner";
import { EncodeSendParams, TransactionParams, WalletParams } from "./types";

export default class WalletPow extends BaseMiner {

    protected wallet: Wallet;
    protected miner: SkalePowMiner;

    constructor(params: WalletParams) {
        super(params.difficulty);
        assert(params.wallet.provider._isProvider, "Wallet does not have a provider");
        this.wallet = params.wallet;
    }
    
    public async send(params: TransactionParams) {

        const { to, data } = params;
    
        let nonce = await this.wallet.getTransactionCount();
        let gas = new BN(params.gas ?? 100000);
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
    
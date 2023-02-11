import { Web3Provider } from "@ethersproject/providers";
import SkalePowMiner from "@skaleproject/pow/src/index";
import BN from "bn.js/index";
import { Interface } from "@ethersproject/abi";
import { InjectedParams, TransactionParams, EncodeSendParams } from "./types";
import { BigNumber } from "@ethersproject/bignumber";
import BaseMiner from "./miner";

export default class InjectedPow extends BaseMiner {

    protected provider: Web3Provider;
    protected miner: SkalePowMiner;
    protected userAddress: string;

    constructor(params: InjectedParams) {
      super(params.difficulty);
        this.provider = params.provider;
    }

    public async send(params: TransactionParams) {

        const { to, data } = params;
    
        const signer = this.provider.getSigner();

        let nonce = await signer.getTransactionCount();
        let gas = new BN(params.gas ?? 100000);
        const mineFreeGasResult = await this.miner.mineGasForTransaction(nonce, gas, signer._address);
        
        return await signer.sendTransaction({
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

    /**
     * 
     * @function updateProvider
     * @description Manually update Web3provider [if applicable]
     * 
     * @param {Web3Provider} newProvider - New Web3Provider [ethers.js]
     * @returns {void}
     * @public
     */
    public updateProvider(newProvider: Web3Provider) : void {
        this.provider = newProvider;
    }
}
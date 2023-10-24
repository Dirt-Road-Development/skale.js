import { BigNumber, utils, providers } from "ethers";
import { InjectedParams, TransactionParams, EncodeSendParams } from "./types";
import BaseMiner from "./miner";

export default class InjectedPow extends BaseMiner {

    protected provider: providers.Web3Provider;

    constructor(params: InjectedParams) {
        super();
        this.provider = params.provider;
    }

    public async send(params: TransactionParams) {

        const { to, data } = params;
    
        const signer = this.provider.getSigner();

        let nonce = await signer.getTransactionCount();
        let gas: number = params.gas ?? 100000;
        const mineFreeGasResult = await this.mineGasForTransaction(nonce, gas, signer._address);
        
        return await signer.sendTransaction({
          to,
          data,
          nonce,
          gasPrice: BigNumber.from(mineFreeGasResult),
        }) 
      }
    
      public async encodeAndSend(params: EncodeSendParams) {
      
        const { abi, functionArgs, functionName} = params;
        
        const contractInterface = new utils.Interface(abi);
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
    public updateProvider(newProvider: providers.Web3Provider) : void {
        this.provider = newProvider;
    }
}
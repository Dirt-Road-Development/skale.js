import SkalePowMiner from "@skaleproject/pow";
import BN from "bn.js";
import Web3 from "web3";

export interface IProofOfWorkParms {
  difficulty?: BN;
  isMainnet: boolean;
  rpcUrl: string;
}

export interface ITransactionParams {
  to: `0x${string}`;
  data: any;
  gas?: number;
}

export interface IEncodeSendParams extends ITransactionParams {
  abi: any;
  fn: string;
  args: any[];
}

export default class ProofOfWork {
  
  private provider: Web3;
  private miner: SkalePowMiner;

  constructor(params: IProofOfWorkParms) {
    this.miner = new SkalePowMiner({ difficulty: params.difficulty });
    this.provider = new Web3(params.rpcUrl);
  }
  
  public async send(params: ITransactionParams) {

    const { to, data } = params;
    let wallet = this.provider.eth.accounts.create();
    let nonce = await this.provider.eth.getTransactionCount(wallet.address);
    let gas: number = params.gas ?? 100000;
    const mineFreeGasResult = await this.miner.mineGasForTransaction(nonce, gas, wallet.address)
    return await this.provider.eth.sendTransaction({
      from: wallet.address,
      to,
      data,
      nonce,
      gasPrice: mineFreeGasResult
    }) 
  }

  public async encodeAndSend(params: IEncodeSendParams) {
  
    const { abi, args, fn} = params;
    
    const contractInterface = new this.provider.eth.Contract(abi);
    const data = contractInterface.methods.encodeABI(fn, args);

    return await this.send({ ...params, data });

  }
}


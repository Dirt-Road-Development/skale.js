import { Wallet } from "@ethersproject/wallet";
import { JsonRpcProvider, } from "@ethersproject/providers";
import { BytesLike } from "@ethersproject/bytes";
import SkalePowMiner from "@skaleproject/pow";
import BN from "bn.js";
import {Interface} from "ethers/lib/utils";
import {ethers} from "ethers";

export interface IProofOfWorkParms {
  difficulty?: BN;
  isMainnet: boolean;
  rpcUrl: string;
}

export interface ITransactionParams {
  to?: `0x${string}`;
  data: BytesLike;
  gas?: BN;
}

export interface IEncodeSendParams extends ITransactionParams {
  abi: any;
  fn: string;
  args: any[];
}

export default class ProofOfWork {
  
  private provider: JsonRpcProvider;
  private miner: SkalePowMiner;
  private wallet: Wallet;

  constructor(params: IProofOfWorkParms) {
    this.miner = new SkalePowMiner({ difficulty: params.difficulty });
    this.provider = new JsonRpcProvider(params.rpcUrl);
    this.wallet = Wallet.createRandom().connect(this.provider);
  }
  
  public async send(params: ITransactionParams) {

    const { to, data } = params;

    let nonce = await this.wallet.getTransactionCount();
    let gas = new BN(100000);
    const mineFreeGasResult = await this.miner.mineGasForTransaction(nonce, gas, this.wallet.address)
    return await this.wallet.sendTransaction({
      from: this.wallet.address,
      to,
      data,
      nonce,
      gasPrice: ethers.BigNumber.from(mineFreeGasResult),
    }) 
  }

  public async encodeAndSend(params: IEncodeSendParams) {
  
    const { abi, args, fn} = params;
    
    const contractInterface = new Interface(abi);
    const data = contractInterface .encodeFunctionData(fn, args);

    return await this.send({ ...params, data });

  }
}


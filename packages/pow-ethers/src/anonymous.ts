import { Wallet } from "@ethersproject/wallet";
import { JsonRpcProvider, } from "@ethersproject/providers";
import SkalePowMiner from "@skaleproject/pow";
import { AnonymousParams } from "./types";
import WalletPow from "./wallet";

export default class AnonymousPoW extends WalletPow {
  
  protected miner: SkalePowMiner;
  protected provider: JsonRpcProvider;

  constructor(params: AnonymousParams) {
    const _provider = new JsonRpcProvider(params.rpcUrl);
    const _wallet = Wallet.createRandom().connect(_provider);
    super({ difficulty: params.difficulty, wallet: _wallet });
    this.provider = _provider;
  }
}


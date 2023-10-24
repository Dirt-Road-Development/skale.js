import { providers, Wallet } from "ethers";
import { AnonymousParams } from "./types";
import WalletPow from "./wallet";

export default class AnonymousPoW extends WalletPow {
  
  protected provider: providers.JsonRpcProvider;

  constructor(params: AnonymousParams) {
    const _provider = new providers.JsonRpcProvider(params.rpcUrl);
    const _wallet = Wallet.createRandom().connect(_provider);
    super({ difficulty: params.difficulty, wallet: _wallet });
    this.provider = _provider;
  }
}


import BN from "bn.js";
import Web3 from "web3";
import * as crypto from "crypto";

interface Params {
  difficulty?: BN;
}

class SkalePowMiner {
  
  public difficulty: BN = new BN(1);

  constructor(params?: Params) {
    if (params && params.difficulty) this.difficulty = params.difficulty; 
  }
}

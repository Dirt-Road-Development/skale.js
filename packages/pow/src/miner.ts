import BN from "bn.js";
import { isHex, hexToNumber, soliditySha3 } from "web3-utils";
import * as crypto from "crypto";

interface Params {
  difficulty?: BN;
}

export default class SkalePowMiner {
  
  public difficulty: BN = new BN(1);

  constructor(params?: Params) {
    if (params && params.difficulty) this.difficulty = params.difficulty;
  }

  public async mineGasForTransaction(nonce: any, gas: any, from: string) : Promise<any> {
    let address = from;
    nonce = isHex(nonce) ? hexToNumber(nonce) : nonce;
    gas = isHex(gas) ? hexToNumber(gas) : gas;
    return await this.mineFreeGas(gas, address, nonce);
  }

  public async mineFreeGas(gasAmount: any, address: any, nonce: any) {
    let nonceHash = new BN(soliditySha3(nonce).slice(2), 16)
    let addressHash = new BN(soliditySha3(address).slice(2), 16)
    let nonceAddressXOR = nonceHash.xor(addressHash)
    let maxNumber = new BN(2).pow(new BN(256)).sub(new BN(1));
    let divConstant = maxNumber.div(this.difficulty);
    let candidate: any;
    while (true) {
        candidate = new BN(crypto.randomBytes(32).toString('hex'), 16);
        let candidateHash = new BN(soliditySha3(candidate).slice(2), 16);
        let resultHash = nonceAddressXOR.xor(candidateHash);
        let externalGas = divConstant.div(resultHash).toNumber();
        if (externalGas >= gasAmount) {
            break;
        }
    }
    return candidate.toString();
  }
}


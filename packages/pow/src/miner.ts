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

  public async mineGasForTransaction(nonce: string | number, gas: string | number, from: string, bytes?: string) : Promise<any> {
    let address = from;
    nonce = isHex(nonce) ? hexToNumber(nonce) : nonce as number;
    gas = isHex(gas) ? hexToNumber(gas) : gas as number;
    return await this.mineFreeGas(gas as number, address, nonce as number, bytes);
  }

  public async mineFreeGas(gasAmount: number, address: string, nonce: number, bytes?: string) {
    let nonceHash = new BN((soliditySha3(nonce) as string).slice(2), 16);
    let addressHash = new BN((soliditySha3(address) as string).slice(2), 16);
    let nonceAddressXOR = nonceHash.xor(addressHash)
    let maxNumber = new BN(2).pow(new BN(256)).sub(new BN(1));
    let divConstant = maxNumber.div(this.difficulty);
    let candidate: BN;
    let _bytes: string;

    let iterations = 0

    while (true) {
        _bytes = crypto.randomBytes(32).toString("hex");
        candidate = new BN(bytes ?? _bytes, 16);
        let candidateHash = new BN((soliditySha3(candidate) as string).slice(2), 16);
        let resultHash = nonceAddressXOR.xor(candidateHash);
        let externalGas = divConstant.div(resultHash).toNumber();
        if (externalGas >= gasAmount) {
            break;
        }
        // every 2k iterations, yield to the event loop
        if (iterations++ % 2_000 === 0) {
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
        }
    }
    return candidate.toString();
  }
}


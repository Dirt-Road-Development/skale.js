import { BigNumber, utils } from "ethers";

const DIFFICULTY = BigNumber.from(1);

export default class BaseMiner {
    
    public async mineGasForTransaction(nonce: number, gas: number, from: string, bytes?: string) : Promise<string> {
        return await this.mineFreeGas(gas, from, nonce, bytes);
    }

    public async mineFreeGas(gasAmount: number, address: string, nonce: number, bytes?: string) : Promise<string> {
        let nonceHash = BigNumber.from(utils.solidityKeccak256(["uint256"], [nonce])); // utils.hexlify()
        let addressHash = BigNumber.from(utils.solidityKeccak256(["address"], [address])); // utils.hexlify()
        let nonceAddressXOR = nonceHash.xor(addressHash)
        let maxNumber = BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1));
        let divConstant = maxNumber.div(DIFFICULTY);
        let candidate: BigNumber;
        let _bytes: Uint8Array;

        let iterations = 0

        while (true) {
            _bytes = utils.randomBytes(32);
            candidate = BigNumber.from(utils.hexlify(bytes ?? _bytes));

            let candidateHash = BigNumber.from(utils.solidityKeccak256(["uint256"], [candidate]));
            let resultHash = nonceAddressXOR.xor(candidateHash);
            let externalGas = divConstant.div(resultHash).toNumber();
            
            // console.log("External Gas: ", externalGas, gasAmount);

            if (externalGas >= gasAmount) {
                break;
            }
            // every 2k iterations, yield to the event loop
            if (iterations++ % 400 === 0) {
              await new Promise<void>((resolve) => setTimeout(resolve, 0));
            }
        }
        return candidate.toString();
    }
}
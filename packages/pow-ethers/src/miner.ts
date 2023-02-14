import SkalePowMiner from "@skaleproject/pow";
import BN from "bn.js";

export default abstract class BaseMiner {
    protected miner: SkalePowMiner;

    constructor(difficulty?: BN) {
        this.miner = new SkalePowMiner({ difficulty: difficulty });
    }
}
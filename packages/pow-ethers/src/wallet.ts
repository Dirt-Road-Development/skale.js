import { Wallet } from "@ethersproject/wallet";
import SkalePowMiner from "@skaleproject/pow/src";
import assert from "assert";
import BaseMiner from "./miner";
import { WalletParams } from "./types";

export default class WalletPow extends BaseMiner {

    protected wallet: Wallet;
    protected miner: SkalePowMiner;

    constructor(params: WalletParams) {
        super(params.difficulty);
        assert(params.wallet.provider._isProvider, "Wallet does not have a provider");
        this.wallet = params.wallet;
    }
}
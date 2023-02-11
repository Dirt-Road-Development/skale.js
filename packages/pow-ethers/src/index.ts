/**
 *
 * @author Sawyer Cutler
 * @license MIT
 * @copyright 2022 Dirt Road Dev
 * @package @skaleproject/pow-ethers
 *
 */

import AnonymousPoW from "./anonymous";
import AnonymousContractPow from "./anonymous_contract";
import BaseMiner from "./miner";
import InjectedPow from "./injected";
import InjectedContractPow from "./injected_contract";
import WalletPow from "./wallet";
import WalletPowContract from "./wallet_contract";

export default {
    AnonymousPoW,
    AnonymousContractPow,
    BaseMiner,
    InjectedPow,
    InjectedContractPow,
    WalletPow,
    WalletPowContract
};


export * from "./types";
/**
 * @author Sawyer Cutler
 * @license MIT
 * @copyright 2022 Dirt Road Dev
 * @package @skale.js
**/

import {
    Address,
    Chains,
    Constants
} from "@skaleproject/constants";

import {
    ConfigController
} from "@skaleproject/config-controller";

import {
    Context
} from "@skaleproject/context";

import {
    Etherbase
} from "@skaleproject/etherbase";

import {
    Marionette
} from "@skaleproject/marionette";

import {
    MultisigWallet
} from "@skaleproject/multisig-wallet"

import { 
    AccessControl,
    AccessControlEnumerable,
    Chain,
    Contract,
    Provider,
    Role,
    Utils
} from "@skaleproject/utils";



const skale: any = {
    /// Constants
    constants: {
        Address,
        Constants,
        Chains,
    },
    /// Predeployed Contracts on SKALE Chain
    predeployed: {
        ConfigController,
        Context,
        Etherbase,
        Marionette,
        MultisigWallet
    },
    utils: {
        AccessControl,
        AccessControlEnumerable,
        Chain,
        Contract,
        Provider,
        Role
    }
}

export {
    skale,
    Address,
    Constants,
    Chains,
    ConfigController,
    Context,
    Etherbase,
    Marionette,
    MultisigWallet,
    AccessControl,
    AccessControlEnumerable,
    Chain,
    Contract,
    Provider,
    Role,
    Utils
}

export {
    IContractParams,
    IGetRoleMember,
    IInitParams,
    IParams,
    IRole,
    IRoleAccount
} from "@skaleproject/utils";

/*
 *
 * @author Sawyer Cutler
 * @license MIT
 * @copyright 2022 Dirt Road Dev
 * @package @skale.js/utils
 *
**/

import * as Role from "./role";
import * as Chain from "./chain";
import * as Provider from "./provider"
import * as Contract from "./contracts";

const Utils = {
    ...Chain,
    ...Contract,
    ...Provider,
    ...Role,
}

export {
    Chain,
    Contract,
    Provider,
    Role,
    Utils,
}

export * from "./contracts";
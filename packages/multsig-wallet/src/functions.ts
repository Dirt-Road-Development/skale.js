/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/multisig-wallet
 *
 * @file functions.ts
 * @author Sawyer Cutler
*/

/**
 * 
 * @type {MSGFuntions} The four core function names
 * 
 */
export type MSGFunctions = "addOwner" | "removeOwner" | "replaceOwner" | "changeRequirement";

/**
 * @constant
 * @name MSGFunctionMap
 */
export const MSGFunctionMap: Record<MSGFunctions, string> = {
    addOwner: "addOwner",
    removeOwner: "removeOwner",
    replaceOwner: "replaceOwner",
    changeRequirement: "changeRequirement"
};
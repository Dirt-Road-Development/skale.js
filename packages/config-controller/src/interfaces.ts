/**
 * 
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/config-controller
 * 
 * @file interfaces.ts
 * @author Sawyer Cutler
 * 
*/

/**
 * Base Parameters for Functions that Have Optional Checks
 * 
 * @param {boolean?} runChecks - If Exists and True, Run Checks
 */
export interface IBaseParams {    
    runChecks?: boolean;
}

/**
 * IBaseParams -> Relabled for Clarity
 * 
 * @param {boolean?} runChecks - If Exists and True, Run Checks 
 */
export interface IMTMToggleParams extends IBaseParams {}

/**
 * Base Parameters for Functions that Have Optional Checks
 * 
 * @param {boolean} runChecks - If True, Run Checks, Else Don't
 */
export interface IDefault {
    runChecks: boolean;
}

/**
 * Base Parameters for Functions that Have Optional Checks
 * 
 * @param {boolean} runChecks - If Exists and True, Run Checks
 * @param {string} address - The address to add or remove from the whitelist
 */
export interface IWhitelist extends IDefault {
    address: string;
}

/**
 * Base Parameters for Functions that Have Optional Checks
 * 
 * @param {boolean} runChecks - If Exists and True, Run Checks
 * @param {string} version - The version to pass to the Config Controller
 */
export interface IVersion extends IDefault {
    version: string;
}
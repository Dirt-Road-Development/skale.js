/**
 * 
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/context
 * 
 * @file interfaces.ts
 * @author Sawyer Cutler
 * 
*/

/**
 * INewOwner is passed when a new owner is assigned to the SKALE Chain
 * 
 * @param {string} address - The New Address Being Assigned Ownership
 */
export interface INewOwner {
    address: string;
}
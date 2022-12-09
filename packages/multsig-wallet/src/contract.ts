/**
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/multisig-wallet
 *
 * @file contract.ts
 * @author Sawyer Cutler
*/

import { Addresses } from "@skaleproject/constants/lib/addresses";
import { IInitParams } from "@skaleproject/utils";
import { BaseContract } from "@skaleproject/utils/lib/contracts/base_contract";
import { BigNumber, Contract, ContractReceipt, ethers } from "ethers";
import { BytesLike, isAddress } from "ethers/lib/utils";
import MultisigWalletABI from "./abi.json";
import { MSGFunctionMap } from "./functions";
import { IAddress, IBaseTransaction, ICreateNewWallet, IOnlyWalletFunction, IReplaceOwner, IRequirement, ITransaction, ITransactionCount, ITransactionId, ITransactionIds } from "./interfaces";
import MultisigWalletBytecode from "./bytecode";
import assert, { AssertionError } from "assert";

/**
 * @contract MultisigWallet
 */
export class MultisigWallet extends BaseContract {

    public static MAX_OWNER_COUNT: number = 50;

    /**
     * 
     * Initialization of the MultisigWallet Contract
     * This is a wrapper of the solidity smart contract 
     * 
     * @param {IInitParams} params - The core parameters passed into the constructor
     */
     constructor(params: IInitParams) {
        super({
            ...params,
            address: params.address ?? Addresses.Schain.SCHAIN_MULTISIG_WALLET_ADDRESS,
            abi: params.abi ?? MultisigWalletABI
        });
    }

    /**
     * 
     * Custom Function
     * Utilizes the MultisigWallet Bytecode and Abi to deploy a new Multisig Wallet on a SKALE Chain 
     * Valid Requirements are checked on the client in order to help guide deployment
     * 
     * @function createNewWallet
     * 
     * @param {ICreateNewWallet} params - {@inheritdoc ICreateNewWallet}
     * @returns {Promise<Contract>} Smart Contract Instance. The address can be derived from it.
     * 
     * @public
    */
    public async createNewWallet(params: ICreateNewWallet) : Promise<Contract> {
        this.checkSigner();
        this.validRequirement(params)
        
        const factory = new ethers.ContractFactory(MultisigWalletABI, MultisigWalletBytecode, this.signer);
        const contractDeployment = await factory.deploy(params.owners, params.required);

        return await contractDeployment.deployed();
    }

    /**
     * 
     * Wrapper for addOwner Functionality on the Multisig Wallet
     * Add Owner is a function that can only be called by itself
     * This function allows an EOA to submit a transaction via the Multisig Wallet to edit itself
     * 
     * @function addOwner
     * 
     * @param {IAddress} params - {@inheritdoc IAddress}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */
    public async addOwner(params: IAddress) : Promise<ContractReceipt> {
        this.checkSigner();
        if (!isAddress(params.address)) throw new AssertionError({ message: "MultisigWallet: Invalid Ethereum Address" });
        return await this.submitTransaction({
            destination: this.contract.address,
            value: BigNumber.from(0),
            data: this.onlyWalletFunction({
                function: "addOwner",
                    values: [params.address]
            })
        });
    }

    /**
     * 
     * Wrapper for removeOwner Functionality on the Multisig Wallet
     * Remove Owner is a function that can only be called by itself
     * This function allows an EOA to submit a transaction via the Multisig Wallet to edit itself
     * 
     * @function removeOwner
     * 
     * @param {IAddress} params - {@inheritdoc IAddress}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */    
    public async removeOwner(params: IAddress) : Promise<ContractReceipt> {
        this.checkSigner();
        if (!isAddress(params.address)) throw new AssertionError({ message: "MultisigWallet: Invalid Ethereum Address" });
        return await this.submitTransaction({
            destination: this.contract.address,
            value: BigNumber.from(0),
            data: this.onlyWalletFunction({
                function: "removeOwner",
                values: [params.address]
            })
        });
    }

    /**
     * 
     * Wrapper for replaceOwner Functionality on the Multisig Wallet
     * Replace Owner is a function that can only be called by itself
     * This function allows an EOA to submit a transaction via the Multisig Wallet to edit itself
     * 
     * @function replaceOwner
     * 
     * @param {IReplaceOwner} params - {@inheritdoc IReplaceOwner}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */  
    public async replaceOwner(params: IReplaceOwner) : Promise<ContractReceipt> {
        this.checkSigner();
        if (!isAddress(params.owner)) throw new AssertionError({ message: "MultisigWallet: Owner is Invalid Ethereum Address" });
        if (!isAddress(params.newOwner)) throw new AssertionError({ message: "MultisigWallet: New Owner Invalid Ethereum Address" });
        return await this.submitTransaction({
            destination: this.contract.address,
            value: BigNumber.from(0),
            data: this.onlyWalletFunction({
                function: "replaceOwner",
                values: [params.owner, params.newOwner]
            })
        });
    }

    /**
     * 
     * Wrapper for changeRequirement Functionality on the Multisig Wallet
     * changeRequirement is a function that can only be called by itself
     * This function allows an EOA to submit a transaction via the Multisig Wallet to edit itself
     * 
     * @function changeRequirement
     * 
     * @param {IRequirement} params - {@inheritdoc IRequirement}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */  
    public async changeRequirement(params: IRequirement) : Promise<ContractReceipt> {
        this.checkSigner();
        if (params.required === 0) throw new AssertionError({ message: "MultisigWallet: Must have at least one required signer" });
        return await this.submitTransaction({
            destination: this.contract.address,
            value: BigNumber.from(0),
            data: this.onlyWalletFunction({
                function: "changeRequirement",
                values: [BigNumber.from(params.required)]
            })
        })
    }

    /**
     * 
     * Internal Function to check if the request is a valid requirement
     * This is used for the custom create new multisigwallet function
     * 
     * @function validRequirement
     * 
     * @param {ICreateNewWallet} params - {@inheritdoc IRequirement}
     * @returns {void} 
     * 
     * @private
    */  
    private validRequirement(params: ICreateNewWallet) : void {
        const numberOwners: number = params.owners.length;
        assert(numberOwners > 0, "Multisig Wallet: Requires at least 1 owner");
        assert(numberOwners <= 50, "Multisig Wallet: Must be less than 51 signers");
        assert(params.required > 0, "Multisig Wallet: Requires at least 1 signer");
        assert(params.required <= numberOwners, "Multisig Wallet: Required Signatures must be less than or equal to number owners");
        // if(params.required === 0) throw new AssertionError({ expected: true, message: "Multisig Wallet: Requires at least 1 signer" });
        // if(numberOwners > 50) throw new AssertionError({ expected: true, message: "Multisig Wallet: Must be less than 51 signers" });
        // if(params.required > numberOwners) throw new AssertionError({ expected: true, message: "Multisig Wallet: Required Signatures must be less than or equal to number owners" });
        
    }

    /**
     * 
     * Wrapper for submitTransaction Functionality on the Multisig Wallet
     * submitTransaction is the primary function that all "changes" are made through
     * This function allows an EOA to submit a transaction via the Multisig Wallet to edit itself
     * 
     * @function submitTransaction
     * 
     * @param {IBaseTransaction} params - {@inheritdoc IBaseTransaction}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */  
    public async submitTransaction(params: IBaseTransaction) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.submitTransaction(
            params.destination,
            params.value,
            params.data
        )
    }

    /**
     * 
     * Wrapper for confirmTransaction Functionality on the Multisig Wallet
     * confirmTransaction is the primary function that all "changes" are finalized through
     * This function allows an EOA to confirm a transaction via the Multisig Wallet
     * This would be used when someone else proposes a transaction
     * 
     * @function submitTransaction
     * 
     * @param {ITransactionId} params - {@inheritdoc ITransactionId}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */  
    public async confirmTransaction(params: ITransactionId) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.confirmTransaction(params.transactionId);
    }

    /**
     * 
     * Wrapper for executeTransaction Functionality on the Multisig Wallet
     * executeTransaction is the function called to execute a transaction that has a valid number of confirmations
     * This function allows an EOA to execute and submit a transaction to be picked up by the network
     * This would be used after "enough" signers have confirmed 
     * 
     * @function executeTransaction
     * 
     * @param {ITransactionId} params - {@inheritdoc ITransactionId}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */
    public async executeTransaction(params: ITransactionId) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.confirmTransaction(params.transactionId);
    }

    /**
     * 
     * Private function that is used to generate encoded data that can be used for multisig execution
     * This is a custom function with custom types that is built specifically for the predeployed multisig
     * This increases type safety on the client side where as calling this manualy could result in a higher chance of mispelling funciton names or encoded data with negative results
     * 
     * @function onlyWalletFunction
     * 
     * @param {IOnlyWalletFunction} params - {@inheritdoc IOnlyWalletFunction}
     * @returns {Promise<ContractReceipt>} Contract Receipt
     * 
     * @public
    */
    private onlyWalletFunction(params: IOnlyWalletFunction) : BytesLike {
        return this.contract.interface.encodeFunctionData(
            MSGFunctionMap[params.function],
            params.values
        );
    }

    /**
     * 
     * Checks if transaction is confirmed 
     
     * @function isConfirmed
     * 
     * @param {ITransactionId} params - {@inheritdoc ITransactionId}
     * @returns {Promise<boolean>} Is Tx Confirmed
     * 
     * @public
    */
    public async isConfirmed(params: ITransactionId) : Promise<boolean> {
        return await this.contract.isConfirmed(params.transactionId);
    }

    /**
     * 
     * Gets confirmation count for a transaction by id
     * 
     * @function getConfirmationCount
     * 
     * @param {ITransactionId} params - {@inheritdoc ITransactionId}
     * @returns {Promise<BigNumber>} Number of Confirmations
     * 
     * @public
    */
    public async getConfirmationCount(params: ITransactionId) : Promise<BigNumber> {
        return await this.contract.getConfirmationCount(params.transactionId);
    }

    /**
     * 
     * Get Transaction Count
     * 
     * @function getTransactionCount
     * 
     * @param {ITransactionCount} params - {@inheritdoc ITransactionCount}
     * @returns {Promise<BigNumber>} Number of Txs 
     * 
     * @public
    */
    public async getTransactionCount(params: ITransactionCount) : Promise<BigNumber> {
        return await this.contract.getTransactionCount(params.pending, params.executed);
    }

    /**
     * 
     * Get Multisig Wallet Owners
     * 
     * @function getOwners
     * 
     * @returns {Promise<string[]>} List of Owners
     * 
     * @public
    */
    public async getOwners() : Promise<string[]> {
        return await this.contract.getOwners();
    }

    /**
     * 
     * Gets List of Owners Who Confirmed a Transaction
     * 
     * @function getConfirmations
     * 
     * @param {ITransactionId} params - {@inheritdoc ITransactionId}
     * @returns {Promise<string[]>} List of Owners
     * 
     * @public
    */
    public async getConfirmations(params: ITransactionId) : Promise<string[]> {
        return await this.contract.getConfirmations(params.transactionId);
    }

    /**
     * 
     * Gets Transaction Ids within the given range and of type
     * 
     * @function getTransactionIds
     * 
     * @param {ITransactionIds} params - {@inheritdoc ITransactionIds}
     * @returns {Promise<BigNumber[]>} List of Tx Ids
     * 
     * @public
    */
    public async getTransactionIds(params: ITransactionIds) : Promise<BigNumber[]> {
        return await this.contract.getTransactionIds(params.from, params.to, params.pending, params.executed);
    }

    /**
     * 
     * Checks whether address is owner of multisig
     * 
     * @function isOwner
     * 
     * @param {IAddress} params - {@inheritdoc IAddress}
     * @returns {Promise<boolean>} True if Owner
     * 
     * @public
    */
    public async isOwner(params: IAddress) : Promise<boolean> {
        return await this.contract.isOwner(params.address);
    }

    /**
     * 
     * Gets Data from a Transaction
     * 
     * @function getTransaction
     * 
     * @param {ITransactionId} params - {@inheritdoc ITransactionId}
     * @returns {Promise<ITransaction>} Transaction Data
     * 
     * @public
    */
    public async getTransaction(params: ITransactionId) : Promise<ITransaction> {
        const data = await this.contract.transactions(params.transactionId);
        return {
            ...data
        } as ITransaction;
    }

    /**
     * 
     * Gets Total # of Signers Needed to Confirm a Transaction
     * 
     * @function getRequired
     * 
     * @returns {number} Number of Confirmations Needed
     * 
     * @public
    */
    public async getRequired() : Promise<number> {
        const required: BigNumber = await this.contract.required();
        return required.toNumber();
    }
}
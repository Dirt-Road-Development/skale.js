import { Addresses } from "@skaleproject/constants/lib/addresses";
import { IInitParams } from "@skaleproject/utils";
import { BaseContract } from "@skaleproject/utils/lib/contracts/base_contract";
import { BigNumber, Contract, ContractReceipt, ethers } from "ethers";
import { BytesLike, isAddress } from "ethers/lib/utils";
import MultisigWalletABI from "./abi.json";
import { MSGFunctionMap } from "./functions";
import { IAddress, IBaseTransaction, ICreateNewWallet, IOnlyWalletFunction, IReplaceOwner, IRequirement, ITransaction, ITransactionCount, ITransactionId, ITransactionIds } from "./interfaces";
import MultisigWalletBytecode from "./bytecode";
import { AssertionError } from "assert";

export class MultisigWallet extends BaseContract {

    public static max_owner_count: number = 50;

    /**
     * 
     * @param params
     *
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
     * @param { ICreateNewWallet } params
     * @returns ContractReceipt
     */
    public async createNewWallet(params: ICreateNewWallet) : Promise<Contract> {
        this.checkSigner();
        this.validRequirement(params)
        
        const factory = new ethers.ContractFactory(MultisigWalletABI, MultisigWalletBytecode, this.signer);
        const contractDeployment = await factory.deploy(params.owners, params.required);

        return await contractDeployment.deployed();
    }

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

    private validRequirement(params: ICreateNewWallet) {
        const numberOwners: number = params.owners.length;
        
        if(numberOwners === 0) throw new AssertionError({ expected: true, message: "Multisig Wallet: Requires at least 1 owner" });
        if(params.required === 0) throw new AssertionError({ expected: true, message: "Multisig Wallet: Requires at least 1 signer" });
        if(numberOwners > 50) throw new AssertionError({ expected: true, message: "Multisig Wallet: Must be less than 51 signers" });
        if(params.required > numberOwners) throw new AssertionError({ expected: true, message: "Multisig Wallet: Required Signatures must be less than or equal to number owners" });
        
    }

    public async submitTransaction(params: IBaseTransaction) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.submitTransaction(
            params.destination,
            params.value,
            params.data
        )
    }

    public async confirmTransaction(params: ITransactionId) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.confirmTransaction(params.transactionId);
    }

    public async executeTransaction(params: ITransactionId) : Promise<ContractReceipt> {
        this.checkSigner();
        return await this.contract.confirmTransaction(params.transactionId);
    }

    private onlyWalletFunction(params: IOnlyWalletFunction) : BytesLike {
        return this.contract.interface.encodeFunctionData(
            MSGFunctionMap[params.function],
            params.values
        );
    }

    public async isConfirmed(params: ITransactionId) : Promise<boolean> {
        return await this.contract.isConfirmed(params.transactionId);
    }

    public async getConfirmationCount(params: ITransactionId) : Promise<BigNumber> {
        return await this.contract.getConfirmationCount(params.transactionId);
    }

    public async getTransactionCount(params: ITransactionCount) : Promise<BigNumber> {
        return await this.contract.getTransactionCount(params.pending, params.executed);
    }

    public async getOwners() : Promise<string[]> {
        return await this.contract.getOwners();
    }

    public async getConfirmations(params: ITransactionId) : Promise<string[]> {
        return await this.contract.getConfirmations(params.transactionId);
    }

    public async getTransactionIds(params: ITransactionIds) : Promise<BigNumber[]> {
        return await this.contract.getTransactionIds(params.from, params.to, params.pending, params.executed);
    }

    public async isOwner(params: IAddress) : Promise<boolean> {
        return await this.contract.isOwner(params.address);
    }

    public async getTransaction(params: ITransactionId) : Promise<ITransaction> {
        const data = await this.contract.transactions(params.transactionId);
        return {
            ...data
        } as ITransaction;
    }

    public async getRequired() : Promise<number> {
        const required: BigNumber = await this.contract.required();
        return required.toNumber();
    }
}
import { Addresses } from "@skaleproject/constants/lib/addresses";
import { IInitParams } from "@skaleproject/utils";
import { BaseContract } from "@skaleproject/utils/lib/contracts/base_contract";
import { assert } from "console";
import { BigNumber, ContractReceipt } from "ethers";
import { BytesLike, isAddress } from "ethers/lib/utils";
import MultisigWalletABI from "./abi.json";
import { MSGFunctionMap } from "./functions";
import { IAddress, IBaseTransaction, ICreateNewWallet, IOnlyWalletFunction, IReplaceOwner, IRequirement, ITransaction, ITransactionCount, ITransactionId, ITransactionIds } from "./interfaces";

export class Marionette extends BaseContract {

    public static MAX_OWNER_COUNT: number = 50;



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
     * @param params 
     * @returns ContractReceipt
     */
    public async createNewWallet(params: ICreateNewWallet) : Promise<ContractReceipt> {
        this.checkSigner();
        await this.validRequirement(params);
        return await this.contract.MultiSigWallet(params.owners, BigNumber.from(params.required));
    }
    public async addOwner(params: IAddress) : Promise<ContractReceipt> {
        this.checkSigner();
        assert(isAddress(params.address), "MultisigWallet: Invalid Ethereum Address");
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
        assert(isAddress(params.address), "MultisigWallet: Invalid Ethereum Address");
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
        assert(isAddress(params.owner), "MultisigWallet: Owner is Invalid Ethereum Address");
        assert(isAddress(params.newOwner), "MultisigWallet: New Owner Invalid Ethereum Address");
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
        return await this.submitTransaction({
            destination: this.contract.address,
            value: BigNumber.from(0),
            data: this.onlyWalletFunction({
                function: "changeRequirement",
                values: [BigNumber.from(params.required)]
            })
        })
    }

    private async validRequirement(params: ICreateNewWallet) : Promise<void> {
        const numberOwners: number = params.owners.length;
        assert(numberOwners > 0, "Multisig Wallet: Requires at least 1 owner");
        assert(params.required > 0, "Multisig Wallet: Requires at least 1 signer");
        assert(numberOwners < 51, "Multisig Wallet: Must be less than 51 signers");
        assert(params.required <= numberOwners, "Multisig Wallet: Signers must be less than required");
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

    public async getOwners() : Promise<string> {
        return await this.contract.getOwners();
    }

    public async getConfirmations(params: ITransactionId) : Promise<string> {
        return await this.contract.getConfirmations(params.transactionId);
    }

    public async getTransactionIds(params: ITransactionIds) : Promise<BigNumber[]> {
        return await this.contract.getTransactionIds(params.from, params.to, params.pending, params.executed);
    }

    public async isOwner(params: IAddress) : Promise<boolean> {
        return await this.contract.isOwner(params.address);
    }

    public async getTransaction(params: ITransactionId) : Promise<ITransaction> {
        return await this.contract.transactions(params.transactionId);
    }

    public async getRequired() : Promise<number> {
        const required: BigNumber = await this.contract.required();
        return required.toNumber();
    }
}
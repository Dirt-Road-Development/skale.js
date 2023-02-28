import { Address } from "@skaleproject/constants";
import { BigNumber, constants, ethers, Wallet } from "ethers";
import { MultisigWallet } from "../src";
import { ITransaction } from "../src/interfaces";

const Addresses = Address.Addresses;

const useMarionette = async({ useSigner }: { useSigner: boolean }) => {
    const rng = Wallet.createRandom().connect(new ethers.providers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"));

    let multisigWallet: MultisigWallet;

    if (useSigner) {
        multisigWallet = new MultisigWallet({
            signer: rng,
            rpcUrl: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague"
        });    
    } else {
        multisigWallet = new MultisigWallet({
            rpcUrl: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague"
        });  
    }
    
    return { multisigWallet, rng };
}

describe("createNewWallet()", () => {
    test("No Signer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.createNewWallet({
                owners: [],
                required: 0
            })
        ).rejects.toThrow("Signer does not exist");
    })
    test("Number Owners Must be Greater Than 0", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.createNewWallet({
                owners: [],
                required: 0
            })
        ).rejects.toThrow("Multisig Wallet: Requires at least 1 owner")
    })
    test("Number Signers Must Be Greater Than 0", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.createNewWallet({
                owners: [Addresses.General.ZERO_ADDRESS],
                required: 0
            })
        ).rejects.toThrow("Multisig Wallet: Requires at least 1 signer")
    })
    test("Number Signers Must Be 50 or Fewer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.createNewWallet({
                owners: Array<string>(55).fill(Addresses.General.ZERO_ADDRESS),
                required: 1
            })
        ).rejects.toThrow("Multisig Wallet: Must be less than 51 signers")
    })
    test("Required Signatures must be less than or equal to number owners", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.createNewWallet({
                owners: Array<string>(3).fill(Addresses.General.ZERO_ADDRESS),
                required: 5
            })
        ).rejects.toThrow("Multisig Wallet: Required Signatures must be less than or equal to number owners")
    })
})
describe("addOwner()", () => {
    test("No Signer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.addOwner({
                address: Addresses.General.ZERO_ADDRESS
            })
        ).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Invalid Address Check", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.addOwner({
                address: "0xNOTANETHEREUMADDRESS"
            })
        ).rejects.toThrow("MultisigWallet: Invalid Ethereum Address"); 
    })
    test("Invalid Access", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.addOwner({
                address: Addresses.General.ZERO_ADDRESS
            })
        ).rejects.toThrow(""); 
    })
})
describe("removeOwner()", () => {
    test("No Signer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.removeOwner({
                address: Addresses.General.ZERO_ADDRESS
            })
        ).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Invalid Address Check", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.removeOwner({
                address: "0xNOTANETHEREUMADDRESS"
            })
        ).rejects.toThrow("MultisigWallet: Invalid Ethereum Address"); 
    })
    test("Invalid Access", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.removeOwner({
                address: Addresses.General.ZERO_ADDRESS
            })
        ).rejects.toThrow(""); 
    })
})
describe("replaceOwner()", () => {
    test("No Signer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.replaceOwner({
                owner: Addresses.General.ZERO_ADDRESS,
                newOwner: Addresses.General.ZERO_ADDRESS
            })
        ).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Invalid Address Check", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.replaceOwner({
                owner: "0xNOTANETHEREUMADDRESS",
                newOwner: Addresses.General.ZERO_ADDRESS
            })
        ).rejects.toThrow("MultisigWallet: Owner is Invalid Ethereum Address"); 
    })
    test("Invalid Access", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.replaceOwner({
                owner: Addresses.General.ZERO_ADDRESS,
                newOwner: "0xNOTANETHEREUMADDRESS"
            })
        ).rejects.toThrow("MultisigWallet: New Owner Invalid Ethereum Address"); 
    })
    test("Invalid Access", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.replaceOwner({
                owner: Addresses.General.ZERO_ADDRESS,
                newOwner: Addresses.General.ZERO_ADDRESS
            })
        ).rejects.toThrow(""); 
    })
})
describe("changeRequirement()", () => {
    test("No Signer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.changeRequirement({
                required: 1
            })
        ).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Required must be greater than 0", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.changeRequirement({
                required: 0
            })
        ).rejects.toThrow("MultisigWallet: Must have at least one required signer"); 
    })
    test("Invalid Access", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.changeRequirement({
                required: 5
            })
        ).rejects.toThrow(""); 
    })
})
describe("confirmTransaction()", () => {
    test("No Signer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.confirmTransaction({
                transactionId: BigNumber.from(1)
            })
        ).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Invalid Access", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.confirmTransaction({
                transactionId: BigNumber.from(1)
            })
        ).rejects.toThrow(""); 
    })
})
describe("executeTransaction()", () => {
    test("No Signer", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.executeTransaction({
                transactionId: BigNumber.from(1)
            })
        ).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Invalid Access", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: true });
        await expect(
            multisigWallet.executeTransaction({
                transactionId: BigNumber.from(1)
            })
        ).rejects.toThrow(""); 
    })
})
describe("isConfirmed()", () => {
    test("False", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.isConfirmed({
                transactionId: BigNumber.from(10000000)
            })
        ).resolves.toEqual(false);
        await expect(
            multisigWallet.isConfirmed({
                transactionId: constants.MaxUint256
            })
        ).resolves.toEqual(false);
    })
})
describe("getConfirmationCount()", () => {
    test("0", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        const transactionCount: BigNumber = await multisigWallet.getConfirmationCount({
            transactionId: BigNumber.from(0)
        })
        expect(Number(transactionCount)).toBeGreaterThanOrEqual(0);
    })
})
describe("getTransactionCount()", () => {
    test("Pending - Not Executed", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        const transactionCount: BigNumber = await multisigWallet.getTransactionCount({
            pending: true,
            executed: false
        });
        expect(Number(transactionCount)).toEqual(0);
    })
    test("Not Pending - Executed", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        const transactionCount: BigNumber = await multisigWallet.getTransactionCount({
            pending: false,
            executed: true
        });
        expect(Number(transactionCount)).toBeGreaterThanOrEqual(32);
    })
    test("Pending - Executed", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        const transactionCount: BigNumber = await multisigWallet.getTransactionCount({
            pending: true,
            executed: true
        });
        expect(Number(transactionCount)).toBeGreaterThanOrEqual(32);
    })
})
describe("getOwners()", () => {
    test("Owners", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        const owners: string[] = await multisigWallet.getOwners();
        expect(owners.length).toEqual(3); 
    })
})
describe("getConfirmations()", () => {
    test("Empty", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        const confirmations: string[] = await multisigWallet.getConfirmations({
            transactionId: constants.One
        });
        expect(confirmations.length).toBeGreaterThanOrEqual(1); 
    })
})
describe("getTransactionIds()", () => {
    test("Empty", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(multisigWallet.getTransactionIds({
            from: BigNumber.from(10),
            to: BigNumber.from(11),
            pending: false,
            executed: false
        })).resolves.toEqual([BigNumber.from(0)])
    })
})
describe("isOwner()", () => {
    test("Not an Owner -> NULL_ADDRESS", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        await expect(
            multisigWallet.isOwner({
                address: Addresses.General.ZERO_ADDRESS
            })
        ).resolves.toEqual(false);
    })
})
describe("getTransaction()", () => {
    test("Information", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        const transaction: ITransaction = await multisigWallet.getTransaction({ transactionId: constants.One });
        expect(transaction.destination).toEqual("0xD2c0DeFACe000000000000000000000000000000");
        expect(Number(transaction.value)).toEqual(0);
        expect(transaction.data).toEqual("0xb61d27f6000000000000000000000000d2002000000000000000000000000000000000d20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000442f2ff15dfc425f2263d0df187444b70e47283d622c70181c5baebb1306a01edba1ce184c0000000000000000000000002c20ef3fc0248fca2dc57bcb202f2cae504a9a6600000000000000000000000000000000000000000000000000000000");
        expect(transaction.executed).toBeFalsy;
    });
})
describe("getRequired()", () => {
    test("Required", async() => {
        const { multisigWallet } = await useMarionette({ useSigner: false });
        
        await expect(
            multisigWallet.getRequired()
        ).resolves.toEqual(2);
    });
})

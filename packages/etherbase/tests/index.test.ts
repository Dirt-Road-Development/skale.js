import {Addresses} from "@skaleproject/constants/lib/addresses";
import { BigNumber, ethers } from "ethers";
import { Etherbase } from "../src";


describe("Etherbase Test Suite", () => {
    
    const signerFixture = async() => {
        const provider = new ethers.providers.JsonRpcProvider("https://staging-v2.skalenodes.com/v1/fancy-rasalhague");
        const rng = ethers.Wallet.createRandom().connect(provider)
        
        const etherbase = new Etherbase({
            signer: rng,
            rpcUrl: "https://staging-v2.skalenodes.com/v1/fancy-rasalhague"
        });
        
        return { etherbase, rng };
    }

    const fixture = async() => {
        
        const etherbase = new Etherbase({
            rpcUrl: "https://staging-v2.skalenodes.com/v1/fancy-rasalhague"
        });

        return { etherbase };
    }

    test("Ether Manager Role Check", async() => {
            const { etherbase } = await fixture();
            const ETHER_MANAGER_ROLE_HASH: string = "0xe0ba7b49edc651b7ad93b374c67f1e9a0d37370168bbb86b81c569ebfa15f046";
            expect(ethers.utils.id("ETHER_MANAGER_ROLE")).toEqual(ETHER_MANAGER_ROLE_HASH);
            expect(ETHER_MANAGER_ROLE_HASH).toEqual(etherbase.ETHER_MANAGER_ROLE);
    })
    describe("retrieve() Function", () => {
        test("retrieve({ receiver }) => Invalid Signer", async () => {
            const { etherbase } = await fixture();
            await expect(etherbase.retrieve({ receiver: "" })).rejects.toThrow("Contract: Does not have a Signer");
        })

        test("retrieve({ receiver, runChecks: true }) => Invalid Signer", async () => {
            const { etherbase } = await signerFixture();
            await expect(etherbase.retrieve({ receiver: Addresses.ZERO_ADDRESS, runChecks: true })).rejects.toThrow("Etherbase: Not ETHER_MANAGER_ROLE");
        })
 
        test("retrieve({ receiver }) => Valid Signer", async () => {
            const { etherbase, rng } = await signerFixture();
            await expect(etherbase.retrieve({ receiver: rng.address, runChecks: false })).rejects.toThrow();
        })
    })

    describe("partiallyRetrieve() Function", () => {
        test("partiallyRetrieve({ receiver }) => Invalid Signer", async() => {
        
            const { etherbase } = await fixture();
            await expect(etherbase.partiallyRetrieve({ receiver: Addresses.ZERO_ADDRESS, amount: BigNumber.from(10) })).rejects.toThrow("Contract: Does not have a Signer")
        })
    
        test("Run Checks", async() => {
            const { etherbase } = await fixture();
            
            await expect(etherbase.partiallyRetrieve({ receiver: "", amount: BigNumber.from(0), runChecks: true })).rejects.toThrow("Contract: Does not have a Signer")
        })

        test("partiallyRetrieve({ reciever, runChecks: false })", async() => {
            const { etherbase } = await signerFixture();
            await expect(etherbase.partiallyRetrieve({ receiver: "", amount: ethers.constants.MaxUint256, runChecks: true })).rejects.toThrow("Contract: Invalid Ethereum Address Param");
        })

        test("partiallyRetrieve({ reciever, amount: Max, runChecks: true })", async() => {
            const { etherbase } = await signerFixture();
            await expect(etherbase.partiallyRetrieve({ receiver: Addresses.ZERO_ADDRESS, amount: ethers.constants.MaxUint256, runChecks: true })).rejects.toThrow("Contract: Insufficient Funds to Retrieve");
        })
        
        test("partiallyRetrieve({ reciever, amount: One, runChecks: true })", async() => {
            const { etherbase } = await signerFixture();
            await expect(etherbase.partiallyRetrieve({ receiver: Addresses.ZERO_ADDRESS, amount: ethers.constants.One, runChecks: true })).rejects.toThrow("Etherbase: Not ETHER_MANAGER_ROLE");
        })
        

    })

    describe("Private Function Testing", () => {

        test("private async fullCheck(params)", async() => {
            const { etherbase } = await fixture();
            await expect(etherbase["fullCheck"]({ receiver: "", amount: BigNumber.from(0) })).rejects.toThrow("Contract: Invalid Ethereum Address Param");
            await expect(etherbase["fullCheck"]({ receiver: Addresses.ZERO_ADDRESS, amount: ethers.constants.MaxUint256 })).rejects.toThrow("Contract: Insufficient Funds to Retrieve");
        });

        test("private async isEtherManager()", async() => {
            const { etherbase } = await fixture();
            expect(await etherbase["isEtherManager"](Addresses.ZERO_ADDRESS)).resolves.toBeFalsy;
        });

        test("private async onlyEtherManagerChecks()", async() => {
            const { etherbase } = await signerFixture();
            
            await expect(etherbase["onlyEtherManagerChecks"]()).rejects.toThrow("Etherbase: Not ETHER_MANAGER_ROLE");
        });
    });
});
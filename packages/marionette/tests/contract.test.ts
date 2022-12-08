/**
 * 
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/marionette
 * 
 * @file contract.test.ts
 * @author Sawyer Cutler
 * 
*/


import { Addresses } from "@skaleproject/constants/lib/addresses";
import { BigNumber, ethers, utils, Wallet } from "ethers";
import { Marionette } from "../src";

const useMarionette = async({ useSigner }: { useSigner: boolean }) => {
    const rng = Wallet.createRandom().connect(new ethers.providers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"));

    let marionette: Marionette;

    if (useSigner) {
        marionette = new Marionette({
            signer: rng,
            rpcUrl: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"
        });    
    } else {
        marionette = new Marionette({
            rpcUrl: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"
        });  
    }
    
    return { marionette, rng };
}

describe("execute()", () => {
    test("No Signer", async() => {
        const { marionette } = await useMarionette({ useSigner: false });
        await expect(
            marionette.execute({
                target: Addresses.ZERO_ADDRESS,
                data: ""
            })
        ).rejects.toThrow("Contract: Not a valid Signer");

    })
    test("Has Signer - No Gas", async() => {
        const { marionette } = await useMarionette({ useSigner: true });
        await expect(
            marionette.execute({
                target: Addresses.ZERO_ADDRESS,
                data: utils.hexlify(1)
            })
        ).rejects.toThrow()
    })
})
describe("sendSFuel()", () => {
    test("No Signer", async() => {
        const { marionette } = await useMarionette({ useSigner: false });
        await expect(
            marionette.sendSFuel({
                target: Addresses.ZERO_ADDRESS,
                value: BigNumber.from(1)
            })
        ).rejects.toThrow("Contract: Not a valid Signer");

    })
    test("Has Signer - No Gas Role", async() => {
        const { marionette } = await useMarionette({ useSigner: true });
        await expect(
            marionette.sendSFuel({
                target: Addresses.ZERO_ADDRESS,
                value: BigNumber.from(1)
            })
        ).rejects.toThrow()
    })
})
describe("encodeFunctionCall()", () => {
    test("No Signer", async() => {
        const { marionette } = await useMarionette({ useSigner: false });
        await expect(
            marionette.encodeFunctionCall({
                target: Addresses.ZERO_ADDRESS,
                data: utils.hexlify(1),
                value: BigNumber.from(0)
            })
        ).rejects.toThrow();
    })
})
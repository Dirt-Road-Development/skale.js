/**
 * 
 * @license MIT
 * @copyright (c) 2022 Dirt Road Dev
 * @package @skaleproject/context
 * 
 * @file contract.test.ts
 * @author Sawyer Cutler
 * 
*/

import { Addresses } from "@skaleproject/constants/lib/addresses";
import { ethers, utils, Wallet } from "ethers";
import { Context } from "../src";

const useContext = async({ useSigner }: { useSigner: boolean }) => {
    const rng = Wallet.createRandom().connect(new ethers.providers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar"));

    let context: Context;

    if (useSigner) {
        context = new Context({
            signer: rng,
            rpcUrl: "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar"
        });    
    } else {
        context = new Context({
            rpcUrl: "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar"
        });  
    }
    
    return { context };
}

test("getSchainName() => string", async() => {
    const { context } = await useContext({ useSigner: false });
    await expect(
        context.getSchainName()
    ).resolves.toEqual("staging-aware-chief-gianfar");
})
test("getSchainOwnerAddress() => string", async() => {
    const { context } = await useContext({ useSigner: false });
    await expect(
        context.getSchainOwnerAddress()
    ).resolves.toEqual(utils.getAddress("0xD2c0DeFACe000000000000000000000000000000"));
})
describe("updateOwnerAddress(address: string) => ContractReceipet", () => {
    test("updateOwnerAddress(address: string) => ContractReceipt", async() => {
        const { context } = await useContext({ useSigner: false });
        await expect(
            context.setSchainOwnerAddress({ address: Addresses.General.ZERO_ADDRESS })
        ).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("updateOwnerAddress(address: string) => ContractReceipt", async() => {
        const { context } = await useContext({ useSigner: true });
        await expect(
            context.setSchainOwnerAddress({ address: Addresses.General.ZERO_ADDRESS })
        ).rejects.toThrow();
    })
})

import { Addresses } from "@skaleproject/constants/lib/addresses";
import { ethers, Wallet } from "ethers";
import { Marionette } from "../src";

const useMarionette = async({ useSigner }: { useSigner: boolean }) => {
    const rng = Wallet.createRandom().connect(new ethers.providers.JsonRpcProvider("https://staging-v2.skalenodes.com/v1/fancy-rasalhague"));

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

describe("postMessage()", () => {
    test("No Signer", async() => {})
    test("Has Signer - IMA Role Fails", async() => {})
})
describe("execute()", () => {
    test("No Signer", async() => {})
    test("Has Signer - No Puppeteer Role", async() => {})
})
describe("sendSFuel()", () => {
    test("No Signer", async() => {})
    test("Has Signer - No Puppeteer Role", async() => {})
})
describe("encodeFunctionCall()", () => {
    test("No Signer", async() => {})
    test("Has Signer - NULL, 0x0, 0x0", async() => {})
})
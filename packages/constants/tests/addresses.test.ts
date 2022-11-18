import { expect } from "chai";
import { Constants } from "../src";


describe("Address Checks", () => {
    it("Zero Address Check", () => {
        expect(Constants.Address.Addresses.ZERO_ADDRESS).to.be.equal("0x0000000000000000000000000000000000000000");
    })
    describe("Predeployed Addresses", () => {
        it("Context Address", () => {
            expect(Constants.Address.Schain.SCHAIN_CONTEXT_ADDRESS).to.be.equal("0xD2001000000000000000000000000000000000D2");
        })
        it("Etherbase Address", () => {
            expect(Constants.Address.Schain.SCHAIN_ETHERBASE_ADDRESS).to.be.equal("0xd2bA3e0000000000000000000000000000000000");
        })
        it("Marionetee Address", () => {         
            expect(Constants.Address.Schain.SCHAIN_MARIONETTE_ADDRESS).to.be.equal("0xD2c0DeFACe000000000000000000000000000000");
        })
        it("Multisg Wallet Address Address", () => {
            expect(Constants.Address.Schain.SCHAIN_MULTISIG_WALLET_ADDRESS).to.be.equal("0xD244519000000000000000000000000000000000");
        });
        it("Config Controller Address", () => {
            expect(Constants.Address.Schain.SCHAIN_CONFIG_CONTROLLER_ADDRESS).to.be.equal("0xD2002000000000000000000000000000000000D2");
        })
    })
});


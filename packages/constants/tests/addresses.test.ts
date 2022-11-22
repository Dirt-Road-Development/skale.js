import { Constants } from "../src";


describe("Address Checks", () => {
    test("Zero Address Check", () => {
        expect(Constants.Address.Addresses.ZERO_ADDRESS).toEqual("0x0000000000000000000000000000000000000000");
    })
    describe("Predeployed Addresses", () => {
        test("Context Address", () => {
            expect(Constants.Address.Schain.SCHAIN_CONTEXT_ADDRESS).toEqual("0xD2001000000000000000000000000000000000D2");
        })
        test("Etherbase Address", () => {
            expect(Constants.Address.Schain.SCHAIN_ETHERBASE_ADDRESS).toEqual("0xd2bA3e0000000000000000000000000000000000");
        })
        test("Marionetee Address", () => {         
            expect(Constants.Address.Schain.SCHAIN_MARIONETTE_ADDRESS).toEqual("0xD2c0DeFACe000000000000000000000000000000");
        })
        test("Multisg Wallet Address Address", () => {
            expect(Constants.Address.Schain.SCHAIN_MULTISIG_WALLET_ADDRESS).toEqual("0xD244519000000000000000000000000000000000");
        });
        test("Config Controller Address", () => {
            expect(Constants.Address.Schain.SCHAIN_CONFIG_CONTROLLER_ADDRESS).toEqual("0xD2002000000000000000000000000000000000D2");
        })
    })
});


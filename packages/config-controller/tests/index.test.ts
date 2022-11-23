import { ConfigController } from "../src";

describe("Config Controller Core Testing", () => {
    describe("Public Functions", () => {
        test("isFCDEnabled() => boolean", async() => {})
        test("isMTMEnabled() => boolean", async() => {})
        test("isAddressWhitelisted() => boolean", async() => {})
    })
    describe("enableMTM()", async() => {
        test("No Signer() => boolean", async() => {})
        test("Has Signer -> No Checks() => boolean", async() => {})
        test("Has Signer -> Run Checks() => boolean", async() => {})
    });
    describe("disableMTM()", async() => {
        test("No Signer() => boolean", async() => {})
        test("Has Signer -> No Checks() => boolean", async() => {})
        test("Has Signer -> Run Checks() => boolean", async() => {})
    });
    describe("disableFreeContractDeployment()", async() => {
        test("No Signer() => boolean", async() => {})
        test("Has Signer -> No Checks() => boolean", async() => {})
        test("Has Signer -> Run Checks() => boolean", async() => {})
    });
    describe("enableFreeContractDeployment()", async() => {
        test("No Signer() => boolean", async() => {})
        test("Has Signer -> No Checks() => boolean", async() => {})
        test("Has Signer -> Run Checks() => boolean", async() => {})
    });
    describe("setVersion()", async() => {
        test("No Signer() => boolean", async() => {})
        test("Has Signer -> No Checks() => boolean", async() => {})
        test("Has Signer -> Run Checks() => boolean", async() => {})
    })
    describe("Private Functions", () => {
        describe("mtmChecks()", () => {})
        describe("fcdChecks()", () => {})
    })
});


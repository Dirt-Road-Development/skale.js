import { Addresses } from "@skaleproject/constants/lib/addresses";
import { ethers, Wallet } from "ethers";
import { ConfigController } from "../src";

const useConfigController = async({ useSigner }: { useSigner: boolean }) => {
    const rng = Wallet.createRandom().connect(new ethers.providers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"));

    let controller: ConfigController;

    if (useSigner) {
        controller = new ConfigController({
            signer: rng,
            rpcUrl: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"
        });    
    } else {
        controller = new ConfigController({
            rpcUrl: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"
        });  
    }
    
    return { controller };
}


describe("Public Functions", () => {
    test("isFCDEnabled() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        expect(await controller.isFCDEnabled()).toBeFalsy;
    })
    test("isMTMEnabled() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        expect(await controller.isMTMEnabled()).toBeFalsy;
    })
    test("isAddressWhitelisted() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        expect(await controller.isAddressWhitelisted({ address: Addresses.ZERO_ADDRESS })).toBeFalsy;
    })
})
describe("enableMTM()", () => {
    test("No Signer() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        await expect(controller.enableMTM()).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Has Signer -> No Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.enableMTM()).rejects.toThrow();
    })
    test("Has Signer -> Run Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.enableMTM({ runChecks: true })).rejects.toThrow();
    })
});
describe("disableMTM()", () => {
    test("No Signer() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        await expect(controller.disableMTM()).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Has Signer -> No Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.disableMTM()).rejects.toThrow();
    })
    test("Has Signer -> Run Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.disableMTM({ runChecks: true })).rejects.toThrow();
    })
});
describe("disableFreeContractDeployment()", () => {
    test("No Signer() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        await expect(controller.disableFreeContractDeployment()).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Has Signer -> No Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.disableFreeContractDeployment()).rejects.toThrow();
    })
    test("Has Signer -> Run Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.disableFreeContractDeployment({ runChecks: true })).rejects.toThrow();
    })
});
describe("enableFreeContractDeployment()", () => {
    test("No Signer() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        await expect(controller.enableFreeContractDeployment()).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Has Signer -> No Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.enableFreeContractDeployment()).rejects.toThrow();
    })
    test("Has Signer -> Run Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.enableFreeContractDeployment({ runChecks: true })).rejects.toThrow();
    })
});
describe("setVersion()", () => {
    test("No Signer() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: false });
        await expect(controller.setVersion({ version: "2", runChecks: false })).rejects.toThrow("Contract: Not a valid Signer");
    })
    test("Has Signer -> No Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.setVersion({ version: "2", runChecks: false })).rejects.toThrow();
    })
    test("Has Signer -> Run Checks() => boolean", async() => {
        const { controller } = await useConfigController({ useSigner: true });
        await expect(controller.setVersion({ version: "2", runChecks: true })).rejects.toThrow();
    })
})
describe("Private Functions", () => {
    test("mtmChecks()", async () => {})
    xtest("fcdChecks()", async () => {})
})
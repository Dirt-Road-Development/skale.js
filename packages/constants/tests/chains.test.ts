import { Constants } from "../src";

describe("Chain Checks", () => {
    test("Should Check Proxy Bases", () => {
        expect(Constants.Chains.ProxyBase.mainnet).toEqual("mainnet.skalenodes.com");
        expect(Constants.Chains.ProxyBase.staging).toEqual("staging-v3.skalenodes.com");
    })
    test("Mainnet Checks", () => {
        expect(Constants.Chains.Mainnet).toEqual("Mainnet");
        expect(Constants.Address.Mainnet).not.toEqual("Testnet");
        expect(Constants.Chains.Mainnet).not.toEqual("Staging");
        expect(Constants.Chains.Mainnet).not.toEqual("Ethereum");
    });
    describe("Mainnet Schain Checks", () => {
        test("SKALE Chain Name Checks", () => {
            const keys: string[] = Object.keys(Constants.Chains.MainnetChains);

            expect(keys).toContain("adorable-quaint-bellatrix");
            expect(keys).toContain("affectionate-immediate-pollux");
            expect(keys).toContain("elated-tan-skat");
            expect(keys).toContain("frayed-decent-antares");
            expect(keys).toContain("green-giddy-denebola");
            expect(keys).toContain("haunting-devoted-deneb");
            expect(keys).toContain("honorable-steel-rasalhague");
            expect(keys).toContain("light-vast-diphda");
            expect(keys).toContain("parallel-stormy-spica");
            expect(keys).toContain("portly-passionate-sirius");
            expect(keys).toContain("round-hasty-alsafi");
            expect(keys).toContain("turbulent-unique-scheat");
        })
        test("Community Chain Existence Check", () => {
            const values: string[] = Object.values(Constants.Chains.MainnetChains);

            expect(values).toContain("Own Your Stream");
            expect(values).toContain("CryptoBlades");
            expect(values).toContain("Europa Hub");
            expect(values).toContain("Brawl Chain");
            expect(values).toContain("Nebula Gaming Hub");
            expect(values).toContain("Crypto Rome Chain");
            expect(values).toContain("Calypso NFT Hub");
            expect(values).toContain("Exorde Network");
            expect(values).toContain("SKALE Community Hub");
            expect(values).toContain("Solydaria");
            expect(values).toContain("DEXGames");
            expect(values).toContain("Razor Network");
        })
        test("Mainnet Chain Name Matching", () => {
            const chains: {[key: string]: string} = Constants.Chains.MainnetChains;

            expect(chains["adorable-quaint-bellatrix"]).toEqual("Own Your Stream");
            expect(chains["affectionate-immediate-pollux"]).toEqual("CryptoBlades");
            expect(chains["elated-tan-skat"]).toEqual("Europa Hub");
            expect(chains["frayed-decent-antares"]).toEqual("Brawl Chain");
            expect(chains["green-giddy-denebola"]).toEqual("Nebula Gaming Hub");
            expect(chains["haunting-devoted-deneb"]).toEqual("Crypto Rome Chain");
            expect(chains["honorable-steel-rasalhague"]).toEqual("Calypso NFT Hub");
            expect(chains["light-vast-diphda"]).toEqual("Exorde Network");
            expect(chains["parallel-stormy-spica"]).toEqual("SKALE Community Hub");
            expect(chains["portly-passionate-sirius"]).toEqual("Solydaria");
            expect(chains["round-hasty-alsafi"]).toEqual("DEXGames");
            expect(chains["turbulent-unique-scheat"]).toEqual("Razor Network");
        })
        test("Should have 2 v1 chains", () => {
            expect(Object.keys(Constants.Chains.V1Chains)).toHaveLength(2);
        })
        test("Should throw not undefined or null for all random checks", () => {
            const rng1: string = "abcdefghijklmop";
            const rng2: string = "random-chain-name";

            expect(Constants.Chains.MainnetChains[rng1]).toBeUndefined;
            expect(Constants.Chains.MainnetChains[rng2]).toBeUndefined;
            expect(Constants.Chains.StagingChains[rng1]).toBeUndefined;
            expect(Constants.Chains.StagingChains[rng2]).toBeUndefined;
            expect(Constants.Chains.V1Chains[rng1]).toBeUndefined;
            expect(Constants.Chains.V1Chains[rng2]).toBeUndefined;
            
        })
    });
    
});

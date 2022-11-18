import { expect } from "chai";
import { Constants } from "@dirtroad/skale";

describe("Chain Checks", () => {
    it("Mainnet Checks", () => {
        expect(Constants.Chains.Mainnet).to.be.equal("Mainnet");
        expect(Constants.Address.Mainnet).to.not.be.equal("Testnet");
        expect(Constants.Chains.Mainnet).to.not.be.equal("Staging");
        expect(Constants.Chains.Mainnet).to.not.be.equal("Ethereum");
    });
    describe("Mainnet Schain Checks", () => {
        it("SKALE Chain Name Checks", () => {
            const keys: string[] = Object.keys(Constants.Chains.MainnetChains);

            expect(keys).to.include("adorable-quaint-bellatrix");
            expect(keys).to.include("affectionate-immediate-pollux");
            expect(keys).to.include("elated-tan-skat");
            expect(keys).to.include("frayed-decent-antares");
            expect(keys).to.include("green-giddy-denebola");
            expect(keys).to.include("haunting-devoted-deneb");
            expect(keys).to.include("honorable-steel-rasalhague");
            expect(keys).to.include("light-vast-diphda");
            expect(keys).to.include("parallel-stormy-spica");
            expect(keys).to.include("portly-passionate-sirius");
            expect(keys).to.include("round-hasty-alsafi");
            expect(keys).to.include("turbulent-unique-scheat");
        })
        it("Community Chain Existence Check", () => {
            const values: string[] = Object.values(Constants.Chains.MainnetChains);

            expect(values).to.include("Own Your Stream");
            expect(values).to.include("CryptoBlades");
            expect(values).to.include("Europa Hub");
            expect(values).to.include("Brawl Chain");
            expect(values).to.include("Nebula Gaming Hub");
            expect(values).to.include("Crypto Rome Chain");
            expect(values).to.include("Calypso NFT Hub");
            expect(values).to.include("Exorde Network");
            expect(values).to.include("SKALE Community Hub");
            expect(values).to.include("Solydaria");
            expect(values).to.include("DEXGames");
            expect(values).to.include("Razor Network");
        })
        it("Mainnet Chain Name Matching", () => {
            const chains: {[key: string]: string} = Constants.Chains.MainnetChains;

            expect(chains["adorable-quaint-bellatrix"]).to.be.equal("Own Your Stream");
            expect(chains["affectionate-immediate-pollux"]).to.be.equal("CryptoBlades");
            expect(chains["elated-tan-skat"]).to.be.equal("Europa Hub");
            expect(chains["frayed-decent-antares"]).to.be.equal("Brawl Chain");
            expect(chains["green-giddy-denebola"]).to.be.equal("Nebula Gaming Hub");
            expect(chains["haunting-devoted-deneb"]).to.be.equal("Crypto Rome Chain");
            expect(chains["honorable-steel-rasalhague"]).to.be.equal("Calypso NFT Hub");
            expect(chains["light-vast-diphda"]).to.be.equal("Exorde Network");
            expect(chains["parallel-stormy-spica"]).to.be.equal("SKALE Community Hub");
            expect(chains["portly-passionate-sirius"]).to.be.equal("Solydaria");
            expect(chains["round-hasty-alsafi"]).to.be.equal("DEXGames");
            expect(chains["turbulent-unique-scheat"]).to.be.equal("Razor Network");
        })
        it("Should have 2 v1 chains", () => {
            expect(Object.keys(Constants.Chains.V1Chains)).lengthOf(2);
        })
        it("Should throw not undefined or null for all random checks", () => {
            const rng1: string = "abcdefghijklmop";
            const rng2: string = "random-chain-name";

            expect(Constants.Chains.MainnetChains[rng1]).to.be.undefined;
            expect(Constants.Chains.MainnetChains[rng2]).to.be.undefined;
            expect(Constants.Chains.StagingChains[rng1]).to.be.undefined;
            expect(Constants.Chains.StagingChains[rng2]).to.be.undefined;
            expect(Constants.Chains.V1Chains[rng1]).to.be.undefined;
            expect(Constants.Chains.V1Chains[rng2]).to.be.undefined;
            
        })
    });
    
});

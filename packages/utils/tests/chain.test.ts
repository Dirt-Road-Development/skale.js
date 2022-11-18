import { expect } from "chai";
import {
  Chain 
} from "../src";
import { Assertions } from "@skaleproject/constants";

describe("Chain Function Checks", () => {
    describe("compareChainIds(hex: string, decimal: number)", () => {
        it("Should Succeed", () => {
            const hex: string = "0x1";
            const decimal: number = 1;
            expect(Chain.compareChainIds(hex, decimal)).to.be.true;

            const hex2: string = "0x0";
            const decimal2: number = 0;
            expect(Chain.compareChainIds(hex2, decimal2)).to.be.true;


            const hex3: string = "0x5d456c62";
            const decimal3: number = 1564830818;
            expect(Chain.compareChainIds(hex3, decimal3)).to.be.true;

            const hex4: string = "0x424E28738F9";
            const decimal4: number = 4556465846521;
            expect(Chain.compareChainIds(hex4, decimal4)).to.be.true;

        })

        it("Should Fail", () => {
            const hex: string = "0x1";
            const decimal: number = 0;
            expect(Chain.compareChainIds(hex, decimal)).to.be.false;

            const hex2: string = "0x0";
            const decimal2: number = 1;
            expect(Chain.compareChainIds(hex2, decimal2)).to.be.false;


            const hex3: string = "0x56c62";
            const decimal3: number = 1564830818;
            expect(Chain.compareChainIds(hex3, decimal3)).to.be.false;

            const hex4: string = "0x424E28738F9";
            const decimal4: number = 455646521;
            expect(Chain.compareChainIds(hex4, decimal4)).to.be.false;
        })

        it("Should Throw Assertion Error", () => {
            expect(() => {
                Chain.compareChainIds("abc", 123)
            }).to.Throw(Assertions.INVALID_HEX_VALUE);


            expect(() => {
                Chain.compareChainIds("abc", 123)
            }).to.Throw(Assertions.INVALID_HEX_VALUE);


            expect(() => {
                Chain.compareChainIds("abc", 123)
            }).to.Throw(Assertions.INVALID_HEX_VALUE);
        })
    })
    
    describe("hexToDecimal(hex: string)", () => {
        it("Successfull Examples", () => {
            expect(Chain.hexToDecimal("0x0")).to.be.equal(0);
            expect(Chain.hexToDecimal("0x1")).to.be.equal(1);
        })
    })


    describe("hexToBigNumber(hex: string)", () => {
        it("Successfull Examples", () => {
            expect(Number(Chain.hexToBigNumber("0x0"))).to.be.equal(0);
            expect(Number(Chain.hexToBigNumber("0x1"))).to.be.equal(1);

        })
    })

    describe("decimalToHex(decimal: number)", () => {
        it("Successfull Examples", () => {
            expect(Chain.decimalToHex(0)).to.be.equal("0x0");
            expect(Chain.decimalToHex(1)).to.be.equal("0x1");

        })
    })
})

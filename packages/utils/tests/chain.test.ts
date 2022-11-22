import {
  Chain 
} from "../src";
import { Assertions } from "@skaleproject/constants";

describe("Chain Function Checks", () => {
    describe("compareChainIds(hex: string, decimal: number)", () => {
        it("Should Succeed", () => {
            const hex: string = "0x1";
            const decimal: number = 1;
            expect(Chain.compareChainIds(hex, decimal)).toBeTruthy;

            const hex2: string = "0x0";
            const decimal2: number = 0;
            expect(Chain.compareChainIds(hex2, decimal2)).toBeTruthy;


            const hex3: string = "0x5d456c62";
            const decimal3: number = 1564830818;
            expect(Chain.compareChainIds(hex3, decimal3)).toBeTruthy;

            const hex4: string = "0x424E28738F9";
            const decimal4: number = 4556465846521;
            expect(Chain.compareChainIds(hex4, decimal4)).toBeTruthy;

        })

        it("Should Fail", () => {
            const hex: string = "0x1";
            const decimal: number = 0;
            expect(Chain.compareChainIds(hex, decimal)).toBeFalsy;

            const hex2: string = "0x0";
            const decimal2: number = 1;
            expect(Chain.compareChainIds(hex2, decimal2)).toBeFalsy;


            const hex3: string = "0x56c62";
            const decimal3: number = 1564830818;
            expect(Chain.compareChainIds(hex3, decimal3)).toBeFalsy;

            const hex4: string = "0x424E28738F9";
            const decimal4: number = 455646521;
            expect(Chain.compareChainIds(hex4, decimal4)).toBeFalsy;
        })

        it("Should Throw Assertion Error", () => {
            expect(() => {
                Chain.compareChainIds("abc", 123)
            }).toThrow(Assertions.INVALID_HEX_VALUE);


            expect(() => {
                Chain.compareChainIds("abc", 123)
            }).toThrow(Assertions.INVALID_HEX_VALUE);


            expect(() => {
                Chain.compareChainIds("abc", 123)
            }).toThrow(Assertions.INVALID_HEX_VALUE);
        })
    })
    
    describe("hexToDecimal(hex: string)", () => {
        it("Successfull Examples", () => {
            expect(Chain.hexToDecimal("0x0")).toEqual(0);
            expect(Chain.hexToDecimal("0x1")).toEqual(1);
        })
    })


    describe("hexToBigNumber(hex: string)", () => {
        it("Successfull Examples", () => {
            expect(Number(Chain.hexToBigNumber("0x0"))).toEqual(0);
            expect(Number(Chain.hexToBigNumber("0x1"))).toEqual(1);

        })
    })

    describe("decimalToHex(decimal: number)", () => {
        it("Successfull Examples", () => {
            expect(Chain.decimalToHex(0)).toEqual("0x0");
            expect(Chain.decimalToHex(1)).toEqual("0x1");

        })
    })
})

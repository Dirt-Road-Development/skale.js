import assert from "assert";
import { BigNumber, utils } from "ethers";
import { Assertions, Chains } from "@skaleproject/constants";

const _isHexString = (hex: string) => {
    assert(utils.isHexString(hex), Assertions.INVALID_HEX_VALUE);
}

export const compareChainIds = (hex: string, decimal: number) : boolean => {
    _isHexString(hex);
    return hexToDecimal(hex) === decimal;
}

export const hexToDecimal = (hex: string) : number => {
    _isHexString(hex);
    return parseInt(hex);
}

export const hexToBigNumber = (hex: string) : BigNumber => {
    _isHexString(hex);
    return BigNumber.from(hex);
}

export const decimalToHex = (decimal: number) : string => {
    return "0x" + Number(decimal).toString(16);
}

export const buildRPCUrl = (chainName: string, isMainnet: boolean = true) => {
    return `https://${Chains.ProxyBase[isMainnet ? "mainnet" : "staging"]}/v1/${chainName}`;
}

export const buildBlockScoutURL = (chainName: string, isMainnet: boolean = true) => {
    return `https://${chainName}.explorer.${Chains.ProxyBase[isMainnet ? "mainnet": "staging"]}`;
}

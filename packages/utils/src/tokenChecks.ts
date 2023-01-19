import { ABIs } from "@skaleproject/constants";
import { buildBlockScoutURL, buildRPCUrl } from "./chain";
import { BigNumber, Contract, ethers, providers } from "ethers";
import assert from "assert";
import {TokenManagerERC20} from "@skaleproject/ima";

export interface IParams {
    address: `0x${string}`;
    chainName: "string";
    isMainnet: boolean;
    checkExplorer: boolean;
}

export interface IValidERC20Response {
    name: string;
    symbol: string;
    decimals: number;
    isVerified?: boolean;
}

export interface IVerifiedResponse {
    message: string;
}

export interface ITokenResponse {
    message: string;
    result: {
        cataloged: boolean;
        contractAddress: string;
        decimals: string;
        name: string;
        symbol: string;
        totalSupply: string;
        type: string;
        status: string;
    };
}

const _handleDecimals = (decimals: number | BigNumber) => {
    if (decimals instanceof BigNumber) return decimals.toNumber();
    return decimals;
}

export const isValidERC20 = async(params: IParams) : Promise<IValidERC20Response> => {
    let isVerified: boolean | null;
    const {
        address,
        chainName,
        isMainnet,
        checkExplorer 
    } = params;

    const rpcUrl: string = buildRPCUrl(chainName, isMainnet);
    const provider = new providers.JsonRpcBatchProvider(rpcUrl);
    
    assert(ethers.utils.isAddress(address), "Invalid Ethereum Address");

    /// Part I -> Set Conract
    const token: Contract = new Contract(address, ABIs.default.ERC20, provider);
    /// Part II -> Attempt to Load Core Details
    let tokenInformationArray: [string, string, BigNumber | number] = ["", "", 0];

    const data: [string, string, BigNumber | number] = await Promise.all([
        token.callStatic.name(),
        token.callStatic.symbol(),
        token.callStatic.decimals()
    ]);

    assert(data[0].length > 0, "Expected Name Length to be Greater Than 0");
    assert(data[1].length > 0, "Expected Symbol Length to be Greater Than 0");
        
    data[2] = _handleDecimals(data[2]);
    assert(data[2] > 0, "Expected Decimals to be Greater Than 0");
    assert(data[2] <= 18, "Expected Decimals to be Less Than or Equal to 18");

    tokenInformationArray[0] = data[0];
    tokenInformationArray[1] = data[1];
    tokenInformationArray[2] = data[2];

    /// Part II.5 -> Extra Check on Explorer
    if (checkExplorer) {

        /// Load ERC-20 Details From Explorer
        const explorerUrl: string = buildBlockScoutURL(chainName, isMainnet) + "/api/";
        const tokenResponse = await fetch(explorerUrl + "?module=token&action=getToken&contractaddress=" + address);
        const tokenResponseJson: ITokenResponse = await tokenResponse.json();

        assert(tokenResponseJson.message === "OK", "Bad Response from BlockScout");
        assert(tokenResponseJson.result.type === "ERC-20", "Expected Type to be ERC-20");

        /// Check Verification Status
        const verifiedResponse = await fetch(explorerUrl + "?module=contract&action=getabi&address=" + address);
        const verifiedResponseJson: IVerifiedResponse = await verifiedResponse.json();

        isVerified = verifiedResponseJson.message === "Contract source code not verified";
    }

    /// Part III -> Check for Added Clones
    const tokenManager = new TokenManagerERC20({ rpcUrl });

    const isAddedClone: boolean = await tokenManager.isAddedClone(address);

    assert(!isAddedClone, "Clones cannot be mapped");

    return {
        name: tokenInformationArray[0],
        symbol: tokenInformationArray[1],
        decimals: tokenInformationArray[2],
        isVerified
    };
}

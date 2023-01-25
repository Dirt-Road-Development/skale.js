import ProofOfWork from "../src";
import { ethers } from "ethers";
import {
  ABI as ERC20_INTERFACE,
  bytecode as ERC20_BYTECODE
} from "./erc20";

describe("Unit Testing for Proof of Work", () => {
  
  xtest("Random Deployer Attempt", async() => {
  
    const factory = new ethers.ContractFactory(ERC20_INTERFACE, ERC20_BYTECODE);
    const pow = new ProofOfWork({ isMainnet: true, rpcUrl: "https://mainnet.skalenodes.com/v1/harsh-alsuhail" }); 
    try {

      const res = await pow.send({
        data: factory.interface.encodeDeploy()
      });

      console.log("RES: ", res);

    } catch (err) {
      console.log("RES: ", err);
    }

  })

  xtest("Test Mint", async() => {
    const contract = new ethers.Contract("0x86f38910c6d36989c0ad2ee745b528dce1613dcd", ERC20_INTERFACE);

    const pow = new ProofOfWork({ isMainnet: true, rpcUrl: "https://mainnet.skalenodes.com/v1/harsh-alsuhail" }); 

    try {
      const res = await pow.send({
        to: (contract.address as `0x${string}`),
        data: contract.interface.encodeFunctionData("mint", [ethers.Wallet.createRandom().address])
      });

      console.log("Mint Res: ", res);
    } catch (err) {

      console.log(err);
    }
  });
});

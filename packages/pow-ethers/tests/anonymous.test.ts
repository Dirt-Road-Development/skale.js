import { Interface } from "@ethersproject/abi";
import { Wallet } from "@ethersproject/wallet";
import { AnonymousPoW } from "../src";

const abi: any = [{"type":"constructor","stateMutability":"payable","inputs":[]},{"type":"event","name":"AmountUpdated","inputs":[{"type":"uint256","name":"originalAmount","internalType":"uint256","indexed":true},{"type":"uint256","name":"newAmount","internalType":"uint256","indexed":true},{"type":"address","name":"signer","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Payed","inputs":[{"type":"address","name":"payee","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":true},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"StateToggled","inputs":[{"type":"address","name":"signer","internalType":"address","indexed":true},{"type":"bool","name":"newState","internalType":"bool","indexed":true}],"anonymous":false},{"type":"fallback","stateMutability":"payable"},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deprecate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getAmount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getBalance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"getState","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"pay","inputs":[{"type":"address","name":"receiver","internalType":"address payable"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"toggleState","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAmount","inputs":[{"type":"uint256","name":"_newAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[]},{"type":"receive","stateMutability":"payable"}];

describe("Unit Testing for Proof of Work", () => {

  const setupFixture = async() => {
    const pow = new AnonymousPoW({ rpcUrl: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar" }); 
    return { pow };
  }

  describe("Successful Calls", () => {
    test("Calypso sFUEL Facuet - Anon - Hardcoded", async () => {
      const { pow } = await setupFixture();
      expect(await pow.send({
        to: "0xa9eC34461791162Cae8c312C4237C9ddd1D64336",
        data: "0x0c11dedd000000000000000000000000" + Wallet.createRandom().address.substring(2)
      })).resolves;
    })

    test("Calypso sFUEL Facuet - Anon - Encoded", async() => {
      const { pow } = await setupFixture();
      expect(await pow.send({
        to: "0xa9eC34461791162Cae8c312C4237C9ddd1D64336",
        data: new Interface(abi).encodeFunctionData(
          "pay",
          [Wallet.createRandom().address]
        )
      }))
    })

    test("Calypso sFUEL Facuet - Anon - Encode and Send", async() => {
      const { pow } = await setupFixture();
      expect(pow.encodeAndSend({
        to: "0xa9eC34461791162Cae8c312C4237C9ddd1D64336",
        abi,
        functionArgs: [Wallet.createRandom().address],
        functionName: "pay",
        data: ""
      })).resolves.toHaveReturned;
    })
  });
});

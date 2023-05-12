import SkalePowMiner from "../src";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

const CASE_1_BYTES = "fcb3959dd0f53c43ae680f6251868d60147f6b7f2fe767743d3e525def0e2eb6";
const CASE_2_BYTES = "5be9c82cf1ef3fcf76a937ea41f1fb266755c8260f139fe31f25df18c4fa5082";
const CASE_3_BYTES = "5fa5b4fd2996a7d98674429049bd5350bba384f0b920030786124fc6823579d4";

describe("Proof of Work", () => {
  
  let pow: SkalePowMiner = new SkalePowMiner({});

  describe("Case 1", () => {
    test("multiple iterations to get to a gas number", async() => {
      const mine = await pow.mineFreeGas(50_000, ZERO_ADDRESS, 0);
      expect(mine).toBeTruthy();
    })
    test("mineFreeGas()", async() => {
      const mine = await pow.mineFreeGas(21_000, ZERO_ADDRESS, 0, CASE_1_BYTES);
      expect(mine).toEqual("114300136082501599864048599238123214497793374349333258509328848624001693396662");
    })
    test("mineGasForTransaction", async() => {
      const mine = await pow.mineGasForTransaction(0, 21000, ZERO_ADDRESS, CASE_1_BYTES);
      expect(mine).toEqual("114300136082501599864048599238123214497793374349333258509328848624001693396662");
    })
  })
  xdescribe("Case 2", () => {
    test("mineFreeGas()", async() => {
      const mine = await pow.mineFreeGas(21000, "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b", 0, CASE_2_BYTES);
      expect(mine).toEqual("41573526148156300086939675893764641959041302997817238081803970288791848636546");
    })
    test("mineGasForTransaction", async() => {
      const mine = await pow.mineGasForTransaction(0, 21000, "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b", CASE_2_BYTES);
      expect(mine).toEqual("41573526148156300086939675893764641959041302997817238081803970288791848636546");
    })
  })
  xdescribe("Case 3", () => {
    test("mineFreeGas()", async() => {
      const mine = await pow.mineFreeGas(21000, "0xB90168C8CBcd351D069ffFdA7B71cd846924d551", 0, CASE_3_BYTES);
      expect(mine).toEqual("43262499520687449503832309260678200430029578195756655945185502101712644962772");
    })
    test("mineGasForTransaction", async() => {
      const mine = await pow.mineGasForTransaction(0, 21000, "0xB90168C8CBcd351D069ffFdA7B71cd846924d551", CASE_3_BYTES);
      expect(mine).toEqual("43262499520687449503832309260678200430029578195756655945185502101712644962772");
    })
  })
});

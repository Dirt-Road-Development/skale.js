import { expect } from "chai";
import { Utils } from "../src";

describe("Role Utility Checks", () => {
    describe("Role Hash Function", () => {

        it("Should have successful checks", () => {
            expect(Utils.getRoleHash("DEFAULT_ADMIN_ROLE")).to.be.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
            expect(Utils.getRoleHash("DEPLOYER_ROLE")).to.be.equal("0xfc425f2263d0df187444b70e47283d622c70181c5baebb1306a01edba1ce184c"); 
        })
        it("Should not match", () => {
            expect(Utils.getRoleHash("DEFAULT")).to.be.equal("0x9f28225c7d0ace67fa2516bd7725f3949e9a591de0eae9db822b2cb79f38a6b0");
        });
    })
});

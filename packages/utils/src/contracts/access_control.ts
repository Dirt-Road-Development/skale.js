import { utils } from "ethers";
import { BaseContract, IContractParams } from "./base_contract";

export interface IRole {
    role: string;
}

export interface IRoleAccount extends IRole {
    account: string;
}

export class AccessControl extends BaseContract {

    public DEFAULT_ADMIN_ROLE: string = utils.id("0x00");

    constructor(params: IContractParams) {
        super(params);
    }

    /**
     * @public
     * @function getRoleAdmin
     * @param role
     * @return string
    **/
    public async getRoleAdmin({ role }: IRole) {
        return await this.contract.callStatic.getRoleAdmin(role);
    }

    /**
     * @public
     * @function grantRole
     * @param params
     * @return string
    **/
    public async grantRole(params: IRoleAccount) {
        return await this.contract.callStatic.grantRole(params.role, params.account);
    }

    /**
     * @public
     * @function hasRole
     * @param params
     * @return string
     * @async
    **/
    public async hasRole(params: IRoleAccount) {
        return await this.contract.callStatic.hasRole(params.role, params.account);
    }

    /**
     * @public
     * @function revokeRole
     * @param params
     * @return string
    **/
    public async revokeRole(params: IRoleAccount) {
        return await this.contract.callStatic.revokeRole(params.role, params.account);
    }
    
    /**
     * @public
     * @function renounceRole
     * @param params
     * @return string
    **/
    public async renounceRole(params: IRoleAccount) {
        return await this.contract.callStatic.renounceRole(params.role, params.account);
    }
}
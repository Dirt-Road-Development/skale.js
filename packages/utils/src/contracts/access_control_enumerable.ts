import { BigNumber } from "ethers";
import { IContractParams } from "./base_contract";
import { AccessControl, IRole } from "./access_control";

export interface IGetRoleMember extends IRole {
    index: BigNumber;
}

export class AccessControlEnumerable extends AccessControl {

    constructor(params: IContractParams) {
        super(params);
    }

    /**
     * 
     * @public
     * @function getRoleMember
     * @param params
     * @returns address
    **/
    public async getRoleMember(params: IGetRoleMember) {
        return await this.contract.callStatic.getRoleMember(params.role, params.index);
    }

    /**
     * @public
     * @function getRoleMemberCount
     * @param role
     * @return BigNumber
    **/
    public async getRoleMemberCount({ role }: IRole) {
        return await this.contract.callStatic.getRoleMemberCount(role);
    }
}
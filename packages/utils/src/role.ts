import { utils } from "ethers";

export const getRoleHash = (role: string) : string => {
    return utils.id(role);
}

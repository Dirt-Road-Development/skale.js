import { utils } from "ethers";

export const getRoleHash = (role: string) : string => {
    if (role === "DEFAULT_ADMIN_ROLE") {
        return "0x0000000000000000000000000000000000000000000000000000000000000000";
    }

    return utils.id(role);
}

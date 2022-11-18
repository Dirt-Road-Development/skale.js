import { providers } from "ethers";

export const isValidProvider = (potentialProvider: any) => {
    return providers.Provider.isProvider(potentialProvider);
}

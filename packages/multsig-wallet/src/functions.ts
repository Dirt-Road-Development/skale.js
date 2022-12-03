export type MSGFunctions = "addOwner" | "removeOwner" | "replaceOwner" | "changeRequirement";

export const MSGFunctionMap: Record<MSGFunctions, string> = {
    addOwner: "addOwner",
    removeOwner: "removeOwner",
    replaceOwner: "replaceOwner",
    changeRequirement: "changeRequirement"
};
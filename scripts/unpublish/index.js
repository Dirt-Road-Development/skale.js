const alpha = require("./alpha");

async function main() {
    //// Must be in this order
    ///  Reversal of Build Order to avoid hitting dependency check
    const packages = [
        "skale.js",
        "config-controller",
        "context",
        "etherbase",
        "utils",
        "constants"
    ]

    const alphaRepsonse = await Promise.all(packages.map((packageName) => alpha(packageName)))
}

main()
    .catch((err) => {
        console.log("ERROR: ", err);
    })


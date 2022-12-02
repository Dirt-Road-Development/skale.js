const alpha = require("./alpha");

async function main() {
    const packages = [
        "utils"
    ]

    const alphaRepsonse = await Promise.all(packages.map((packageName) => alpha(packageName)))
}

main()
    .catch((err) => {
        console.log("ERROR: ", err);
    })


const { exec } = require('child_process');
const runFn = require('./exec');

async function main(packageName, tag = "alpha", args) {
    console.log("ARGS: ", args);
    console.log("TOken: ", process.env);

    const packageJson = await runFn(`npm show @skaleproject/${packageName} --json`);

    let json = Object.assign(JSON.parse(packageJson));
    
    const alphaVersion = json["dist-tags"]["alpha"];
    console.log("Alpha Version: ", alphaVersion);
    const allVersions = json["versions"];
    console.log("VS: ", allVersions);
    for (const v of allVersions) {

        if (v.includes("-") && v !== alphaVersion) {
            const res = await runFn(`npm unpublish @skaleproject/${packageName}@${v}`);
            console.log("RES: ", res);
        }                    
    }
    
}

module.exports = main;
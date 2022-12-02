const { exec } = require('child_process');
const runFn = require('./exec');

async function main(packageName) {
    const packageJson = await runFn(`npm show @skaleproject/${packageName} --json`);

    let json = Object.assign(JSON.parse(packageJson));
    
    const alphaVersion = json["dist-tags"]["alpha"];
    const allVersions = json["versions"];
    for (const v of allVersions) {
        if (v.includes("-") && v !== alphaVersion) {
            const res = await runFn(`npm unpublish -f @skaleproject/${packageName}@${v}`);
            console.log("RES: ", res);
        }                    
    }
    
}

module.exports = main;
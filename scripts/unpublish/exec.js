const { exec } = require('child_process');

async function runFn (cmd) {
    return new Promise((resolve, reject) => {
        exec(`${cmd}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}

module.exports = runFn;
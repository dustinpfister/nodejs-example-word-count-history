let exec = require('child_process').exec;

// just check if this is a git folder
exports.folderCheck = (dir) => {
    return new Promise((resolve, reject) => {
        exec('git status', {
            cwd: dir === undefined ? process.cwd() : dir
        }).on('exit', (code) => {
            if (code === 0) {
                resolve('folder is a git folder');
            } else {
                reject('folder is NOT a git folder');
            }
        });
    });
};

// git log -n 20 --format="%H"
exports.commitList = (dir, backCount) => {
    backCount = backCount === undefined ? 5 : backCount;
    return new Promise((resolve, reject) => {
        let list = exec('git log -n ' + backCount + ' --format=\"%H\"'),
        //out = '';
        commits = [];
        list.stdout.on('data', function (data) {
            commits.push(data);
        });
        list.on('exit', function () {
            resolve(commits);
        });
        list.stderr.on('data', function (data) {
            reject(data);
        });
    });
};

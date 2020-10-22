let exec = require('child_process').exec;

// just check if the given folder is a git folder
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

// Get a list of commit objects for the past few commits in a git folder
// each object should have at least a commit id hash, and a date for the commit
// git log -n 20 --format="%H&%ad;"
exports.commitList = (dir, backCount) => {
    backCount = backCount === undefined ? 5 : backCount;
    return new Promise((resolve, reject) => {
        let list = exec('git log -n ' + backCount + ' --format=\"%H&%ad;\"'),
        out = '';
        list.stdout.on('data', function (data) {
            out += data.replace('\n', '');
        });
        list.on('exit', function () {
            let commits = out.split(';');
            // remove any elements that are new lines
            //commits = commits.filter((str) => {
            //        return str != '\n';
            //    });
            commits = commits.map((str) => {
                    let arr = str.split('&');
                    return {
                        commit: arr[0],
                        date: arr[1]
                    };
                });
            commits = commits.filter((commitObj) => {
                    return commitObj.commit != '\n';
                });
            resolve(commits);
        });
        list.stderr.on('data', function (data) {
            reject(data);
        });
    });
};

// switch to the given commit or master (latest) by default
exports.toCommit = (hash, dir) => {
    hash = hash || 'master'
        return new Promise((resolve, reject) => {
            exec('git checkout ' + hash, {
                cwd: dir === undefined ? process.cwd() : dir
            }).on('exit', (code) => {
                if (code === 0) {
                    resolve('now at commit ' + hash);
                } else {
                    reject('error switching commits code: ' + code);
                }
            });
        });

};

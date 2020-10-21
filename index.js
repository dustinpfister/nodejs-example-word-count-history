#!/usr/bin/env node
let exec = require('child_process').exec;

// just check if this is a git folder
let gitFolderCheck = (dir) => {
    return new Promise((resolve, reject) => {
        exec('git status', {
            cwd: dir === undefined ? process.cwd() : dir
        }).on('exit', (code) => {
            if (code === 0) {
                resolve('is a git folder');
            } else {
                reject('is NOT a git folder');
            }
        });
    });
};

// check to see if we have any markdown files

// git log -n 20 --format="%H"
let gitLogCommitList = (dir) => {
    return new Promise((resolve, reject) => {
        let list = exec('git log -n 20 --format=\"%H\"'),
        out = '';
        list.stdout.on('data', function (data) {
            //resolve(data.toString());
            out += data.toString();
        });
        list.on('exit', function () {
            resolve(out);
        });
        list.stderr.on('data', function (data) {
            reject(data.toString());
        });
    });
};

// git check
gitFolderCheck()
.catch((e) => {
    console.log('looks like this might not be a git folder');
})
.then((data) => {
    return gitLogCommitList();
})
.then((data) => {
    console.log(data);
})
.catch((e) => {
    console.log(e);
});

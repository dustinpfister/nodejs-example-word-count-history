#!/usr/bin/env node
let exec = require('child_process').exec;

// just check if this is a git folder
let gitFolderCheck = (dir) => {
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
let gitLogCommitList = (dir, backCount) => {
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

let fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

// check to see if we have any markdown files
let mdCheckFor = (dir) => {
    return readdir(dir)
    .then((files) => {
        var i = 0;
        while (i < files.length) {
            let match = files[i].match(/\.md$/);
            if (match) {
                return Promise.resolve('markdown file found');
            }
            i += 1;
        }
        return Promise.reject('no markdown files found.');
    });
};

// git check
gitFolderCheck()
.catch((e) => {
    console.log(e);
    return Promise.reject('not a git folder');
})
.then(() => {
    return mdCheckFor(process.cwd());
})
.catch((e) => {
    console.log(e);
    return Promise.reject('can not check git log');
})

.then(() => {
    return gitLogCommitList(process.cwd(), 10);
})
.then((data) => {
    console.log(data);
})
.catch((e) => {
    console.log(e);
});

#!/usr/bin/env node
let git = require('./lib/git.js');

// read dir
let fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

git.folderCheck()
.catch((e) => {
    return Promise.reject('not a git folder');
})
.catch((e) => {
    return Promise.reject('can not check git log');
})
// make sure we are at the latest commit on master
.then(() => {
    return git.toCommit('master');
})
// get commit list
.then(() => {
    return git.commitList(process.cwd(), 10);
})
.then((commitList) => {
    let i = commitList.length,
    commitObj;
    console.log(commitList);
    console.log('');
    let loop = (done, error) => {
        i--;
        if (i === -1) {
            done();
        } else {
            commitObj = commitList[i];
            git.toCommit(commitObj.commit, process.cwd())
            .then(() => {
                return readdir(process.cwd());
            })
            .then((files) => {
                loop(done, error);
            })
            .catch((e) => {
                console.log(e);
                error(e);
            })
        }
    };
    return new Promise((resolve, reject) => {
        loop(() => {
            resolve('looks good');
        }, (e) => {
            reject(e);
        })
    });
})
.then(() => {
    console.log('looks good');
    return git.toCommit('master');
})
.catch((e) => {
    console.log(e);
});

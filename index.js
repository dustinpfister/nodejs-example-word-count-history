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
// read dir for each commit, and create post objects
.then((commitList) => {
    let i = commitList.length,
    commitObj;
    let loop = (done, error) => {
        i--;
        if (i === -1) {
            done();
        } else {
            commitObj = commitList[i];
            // switch to current commit
            git.toCommit(commitObj.commit, process.cwd())
            .then(() => {
                // read dir
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
            resolve(commitList);
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

#!/usr/bin/env node
let git = require('./lib/git.js');

// read dir
//let fs = require('fs'),
//promisify = require('util').promisify,
//readdir = promisify(fs.readdir);

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
    // loop for each commitObj in commit list
    let loop = (done, error) => {
        i--;
        if (i === -1) {
            done();
        } else {
            commitObj = commitList[i];
            // switch git folder to current commit
            git.toCommit(commitObj.commit, process.cwd())
            // then get files
            .then(() => {
                // use get changed file names to get a list of changed files
                // for the commit, or all files if it is the first commit
                return git.getChangedFileNames(commitList, i);
            })
            // then work with files
            .then((files) => {
                console.log(files);
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
    console.log('done');
    return git.toCommit('master');
})
.catch((e) => {
    console.log(e);
});

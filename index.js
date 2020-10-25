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
                // if oldest commit use readdir to get a file list
                // as there is nothing to compare to
                if(i == commitList.length - 1){
                    return readdir(process.cwd());
                }else{
                    return git.getChangedFileNames(commitList, i + 1);
                }
            })
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
    console.log('looks good');
    
    return git.toCommit('master');
})
.catch((e) => {
    console.log(e);
});

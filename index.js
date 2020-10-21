#!/usr/bin/env node
let exec = require('child_process').exec;

let gitFolderCheck = (dir) => {
    return new Promise((resolve, reject) => {

        let check = exec('git status');
        check.stdout.on('data', function (data) {
            resolve(data.toString());
        });
        check.stderr.on('data', function (data) {
            reject(data.toString());
        });
    });
};

// git check
gitFolderCheck(process.cwd())
.then((data) => {
    console.log('this is a git');
})
.catch((e) => {
    console.log('looks like this might not be a git folder');
});

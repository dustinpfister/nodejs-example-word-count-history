#!/usr/bin/env node
let exec = require('child_process').exec;

// just check if this is a git folder
let gitFolderCheck = () => {
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
    console.log('this is a git');
    return gitLogCommitList();
})
.then((data) => {
    console.log(data);
})
.catch((e) => {
    console.log(e);
});

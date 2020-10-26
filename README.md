# nodejs-example-word-count-history

I would like to have a nodejs example that will function as a command line tool that will create a collection of objects for each blog post in a git folder. Each object for a post will contain a wordCount property that will be an array of objects, one for each commit where the file was created or edited. An object in this wordCount array will of course have a word count for the post at that state, along with a date object for the commit.

These objects can then be used to create reports that will help me to track my writing productivity. I have started a [blog post on this word count history nodejs example](https://dustinpfister.github.io/2020/10/22/nodejs-example-word-count-history/) if interested.

## The git.js module

The git.js module for this example is where I am using the [exec method of the nodejs child process module](https://dustinpfister.github.io/2020/10/21/nodejs-child-process-exec/) to call git from within a nodejs programming environment. So this is the module that I am using to interface with a git folder to go back to previous states, and find what has changed for each commit.

### git.getChangedFileNames for getting a changed files list

The get changed file names method in this module is what I am using to get a list of changed file names for each commit in a commit list object. In the event that the current commit is the oldest commit, then just a simple fs.readdir is used to get a list of files.


## manual git command examples

The git log command is what is used to get a list of commit hash id codes that can then be used to change the state of the git folder to an older state. In addition these hash codes can also be used with the git diff command to get a list of file names that have changed.

A git log command can be done in the command line manually like this:

```
$ git log -n 20 --format="%H"
d400b26b1262cc472422daacada58cc223e14f56
60a61eecc71c285e3a45f630d4bf9694b111c723
a7f6a4c4628ac9364959eae2734fb9fe7169e5fc
177fbf686774e33bbd3052b85fee7851a38c91e9
9c50450f33bbc172f534522a2c3ddb0124c75b76
9cba08cdd1e20922246893e7af365e89ec078b71
924406ece0ca6e7700085810a18d4d97d5b198ad
621bb77c7b2dc16b7cc11787a601072e06aa8040
429ae30f656f345d32d23f97ec99c1c6f1c3de66
1c2ace8e3032e13dacffddc0940eaed164da05a4
b00649e701606ad8c300de4f59964f7f4cf95373
ea0999ff3b9048533338ba4ede89da659a9db480
f3afdede77a69b638b39b6d9b0bb2a226568b5e7
75721127f491993a221211ba76e7fad06e6fdc49
dc1f6b48ddbec8fd7dea1d70a43f847f1ab1a5bf
fc891d25b2a11afb415857ad7ec113b150857173
33bdcf1ec5d9cf447ce223847302e6ef44b4c393
890ee71c4723ef55a1e3cd46e4259406d8dd08c8
92da29de41be142e636ecadef6e82ae47b159840
48b3efa92ee8711da5c825e4a3301a39d8b26467
```

The git diff command can be used like this with these hash id codes

```
$ git diff 48b3efa92ee8711da5c825e4a3301a39d8b26467 d400b26b1262cc472422daacada58cc223e14f56 --name-only
_posts/canvas-example.md
_posts/git-diff.md
_posts/js-javascript-scope.md
_posts/js-nth-root.md
_posts/js-string-charat.md
```

The checkout command can be used to set the git folder to the state of a given commit hash

```
$ git checkout 75721127f491993a221211ba76e7fad06e6fdc49
```

It can also be used to set back to the latest commit by just giving the name of the branch

```
$ git checkout master
```

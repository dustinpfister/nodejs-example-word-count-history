# todo list for nodejs-example-word-count-history

## 0.5.0 - post objects
* start a posts array that will contain a postObject for each markdown file found
* starting with the oldest commit with markdown files, create a post object for each markdown file found with git.getChangedFilesList
* use markdown.getWordCount to get a word count for each file
* if there is all ready a post object for the markdown file push a new word count for it
* each post object should contain a wordCount object that is an array of word counts, and dates for each commit
* just log results to the console for now.

## 0.4.0 - markdown.getWordCount
* using git.getChangedFilesList start will the oldest commit looking for mark down files
* use markdown.checkForFiles to see if there are any files for a current commit
* if no markdown files are found go to the next commit in the commit list
* have a markdown.getWordCount method
* if there are markdown files loop over each one, and just log the file name, date, amnd word count for now

## 0.3.0 - git.getChangedFilesList method
* (done) have a git.getChangedFilesList method that will use git diff for getting a list of files that changed from last commit
* (done) have git.getChangedFilesList return an array of file names
* (done) pull logic that has to do with using fs.readDir for first commit where there is noting to compare to into git.changedFilesList
* update README on git.js and this method
* update README to link to blog post on this project

## 0.2.0 - Working out loop for each commit
* (done) have a git.toCommit method that will go to the given commit hash id, or latest commit by default
* (done) make sure that the git folder starts out on the latest commit on master
* (done) just read file contents for each commit for starters
* (done) fix bug where the last commit is not read

## 0.1.0 - Improved git.commitList method
* (done) make it so the git.commitList method returns an array of objects where each object contains a commit prop
* (done) the commit prop of one of these objects refers to the current text id of a given commit
* (done) make it so that there is a date property for each object also

## 0.0.0 - just get list of commits
* (done) make this project a bin "blog-wc"
* (done) blog-wc will check if the current working dir is a git folder if not it will log an error message
* (done) blog-wc will check for markdown files and stop with an error if none are found
* (done) if current working path is a git folder blog-wc will preform a git log for the past few commits
* (done) can set the number of commits to go back
* (done) the getLogCommitList method returns an array of commits
* (done) have a /lib/git.js and a /lib/markdown.js
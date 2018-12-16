var issues = require('./issueData').issues;

var issuesApi = {
    getIssuses(callback){
        callback(null,issues.slice())
    },
    saveIssue(issue,callback){
        issue.id = issues.length + 1;
        issues.push(issue);
        callback();
    },
    getIssue(id,callback){
        callback(Object.assign({},issues[id-1]));
    },
    updateissue(issue,callback){
        issues[issue.id-1] = issue;
        callback(null);
    },
    deleteIssue(id,callback){
        issues=issues.slice().filter((item)=>{
            return item.id != id
        })
        //issues.splice(id-1,1)
        callback(null);
    },
    deleteMany(ids,callback){
        issues=issues.filter((item)=>{
            return ids[item.id] != 'on'
        })
        callback()
    }

}

module.exports = issuesApi;
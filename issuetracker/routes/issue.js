var express = require('express');
var router = express.Router();
var issueApi = require('../data/issueApi')

router.get('/',function(req,res,next){
    issueApi.getIssuses(function(err,items){
        //res.json(items)
        res.render('issue/issues', { issues: items})
    })
})
router.get('/create',function(req,res,next){
    //res.render('issue')
    res.render('issue/createIssue')
})
router.post('/create',function(req,res,next){
    const issue = {};
    issue.description = req.body.description;
    issue.status = req.body.status;
    issue.serverity = req.body.serverity;
    issue.createdDate = req.body.createdDate;
    issue.resolvedDate = req.body.resolvedDate;
    issueApi.saveIssue(issue,() => {
        res.redirect('/issue')
    })

})
router.get('/edit/:id',(req,res,next) => {
    issueApi.getIssue(req.params.id,(item) => {
        //console.log(item)
        res.render('issue/editIssue',{issue:item})
    })
    
})
router.post('/edit/:id',(req,res,next) => {
    const issue = {};
    issue.id=req.params.id;
    issue.description = req.body.description;
    issue.status = req.body.status;
    issue.serverity = req.body.serverity;
    issue.createdDate = req.body.createdDate;
    issue.resolvedDate = req.body.resolvedDate;
    issueApi.updateissue(issue,()=>{res.redirect('/issue')})
})
router.get('/delete/:id',(req,res,next) => {
    //res.redirect('/issue')
    issueApi.deleteIssue(req.params.id,()=>{res.redirect('/issue')});
})

router.post('/deleteMany',(req,res,next) => {
    issueApi.deleteMany(req.body,()=>{res.redirect('/issue')})
})
module.exports = router;
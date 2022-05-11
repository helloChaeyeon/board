var express = require('express');

var router = express.Router();

router.post("/write",async function(req,res){
    await Board.create(req.body)
    res.json({
        result:"ok"
    })
})
var Pager = require("node-jyh-pager") //npm install node-jyh-pager server에서 cmd
var pager=new Pager({
    itemPerPage:5
})

router.post("/list",async function(req,res){
    var page = req.body.page
    if (!page){
        page = 1
    }
    var itemPerPage = 5 //한 페이지에 보일 개수
    var offset = pager.getSkip(page)
    var boardList = await Board.findAll({
        limit:itemPerPage,
        offset: offset,
        orders:[["writeTime", "DESC"]]
    })
    var count = await Board.count() //Select count(*) from Board
    var nav = pager.getBottomNav(page,count)
    var pageCount = nav.totalPage

    res.json({
        boardList:boardList,
        pageCount: pageCount
    })    
})
module.exports = router;
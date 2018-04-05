// 전역변수 등록
var commentInput;
var commentList;

var commentArr = [];


function addNewComment(){
    var comment = {
        column_seq: getLastSeq('items'),
        seq: getLastSeq('comments'),
        content: COMMENT_CONTENT,
        date: getNow()
    }

    commentArr.push(comment);
}    

function saveItem(){
    localStorage.setItem('comments', commentArr);
}    

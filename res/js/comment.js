// 전역변수 등록
var inputComment = $('.comment-input');
var commentList;


var commentArr = [];

var comment = {
    column_seq: COLUMN_SEQ,
    seq: COMMENT_SEQ,
    content: COMMENT_CONTENT,
    date: getNow()
}
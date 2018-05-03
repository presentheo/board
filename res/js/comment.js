// 전역변수 등록
var commentInput = $('#commentInput');
var commentList = $('#commentList');
var commentSaveBtn = $('#commentSaveBtn');

var commentArr = [];

// 새로운 코멘트 등록
function addNewComment(){
    var comment = {
        column_seq: (window.location.href.split('').pop())*1,
        seq: getLastSeq('comments')+1,
        content: commentInput.val(),
        date: getNow()
    }

    commentArr.push(comment);

    // 스토리지에 저장하고 렌더링
    saveToStorage('comments', commentArr);
    renderComment();
}    

commentSaveBtn.click(addNewComment);

function getCommentTemplate(seq, content, date){
    return '<li class="comment-item"><div class="comment-num">'+seq+'</div><div class="comment-content">'+content+'</div><div class="comment-date">'+date+'</div><button class="btn btn-remove">삭제</button></li>';
}

// 코멘트 렌더링
function renderComment(){
    commentList.html('');
    var storedComments = JSON.parse(localStorage.getItem('comments'));
    if (storedComments !== null){
        commentArr = storedComments;
        storedComments.forEach(function(e){
            if (e.column_seq == (window.location.href.split('').pop())*1){
                commentList.append(getCommentTemplate(e.seq, e.content, e.date));
            }
        })
    }
}


$(document).ready(function(){
    renderComment();
});


// 임시 코드
// let cols = [
//     {
//         col_seq: 1,
//         col_title: '',
//         col_content: '',
//         comments: [
//             {
//                 comment_seq: 1,
//                 comment_title: ''
//             }
//         ]
//     }
// ];

// let colSeq;
// let colTitle;
// let colContent;


// function addNewCol(){
//     let col = {
//         col_seq: colSeq,
//         col_title: colTitle,
//         col_content: colContent,
//         comments: []
//     }
//     cols.push(col);
// }

// function addNewComment(){
//     let comment = {
//         comment_seq: commentSeq,
//         comment_content: commentContent
//     }
// }
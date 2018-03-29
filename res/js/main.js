
// 전역변수 선언
var inputTitle = $('#inputTitle');
var inputContent = $('#inputContent');
var saveBtn = $('#saveColumn');
var colList = $('#colList');

// 지금 몇시 몇분?
function getNow(){
    var now = new Date();
    var year = now.getFullYear();
    function getFullMonth(m){
        if(m<10){
            return '0'+m;
        }else{
            return m;
        }
    };
    var month = getFullMonth(now.getMonth()+1);
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();

    return year+'-'+month+'-'+date+' '+hour+':'+minute;
}

// 배열 선언
var itemsArr = [];

var index = 0;

// 새 게시물 등록
function addNewCol(){
    var titleVal = inputTitle.val();
    var contentVal = inputContent.val();

    if (titleVal !== '' && contentVal !== ''){
        var item = {
            seq: index,
            title: titleVal,
            content: contentVal,
            date: getNow()
        }
        index = index + 1;
        itemsArr.push(item);
    
        console.log(itemsArr);

        saveItem();
    }else{
        alert('내용을 입력해주세요!');
    }
}

saveBtn.click(addNewCol);


function saveItem(){
    localStorage.setItem('items', JSON.stringify(itemsArr));
    renderItem();
}

function getTemplate(url, seq, title, date){
    return '<li class="column-item"><a class="column-item-anchor" href="'+url+'"><div class="column-item-num"><span>'+seq+'</span></div><div class="column-item-title"><span>'+title+'</span></div><div class="column-item-date"><span>'+date+'</span></div></a></li>';
}

function renderItem(){
    colList.html('');
    var storedItems = JSON.parse(localStorage.getItem('items'));
    storedItems.forEach(function(e){
        colList.append(getTemplate(getUrl(e.seq), e.seq, e.title, e.date));
    })
}


function getUrl(n){
    var url = window.location.href.replace('board.html', 'column.html');
    return url+'?seq='+n;
}

// 스토리지에 있는거 뿌려주는 로직

var colTitle = $('#colTitle');
var colContent = $('#colContent');

function loadCol(){
    var url = window.location.href;
    var seqNum = url.split('?seq=')[1];
    var item = JSON.parse(localStorage.getItem('items'))[seqNum];

    colTitle.html(item.title);
    colContent.html(item.content);
}

$(document).ready(function(){
    loadCol();
})






// // 배열 선언
//     var arrTitle = [];
//     var arrContent = [];

//     function getTemplate(title, content, i){
//         return '<li class="todo-list-item"><span class="todo-list-item-title">'+title+'</span><input class="todo-list-item-title-edit" type="text" style="display: none" index="'+i+'"><span class="todo-list-item-content">'+content+'</span><input class="todo-list-item-content-edit" type="text" style="display: none" index="'+i+'"><button class="todo-list-item-remove" index="'+i+'">삭제</button></li>';
//     }

//     // 새 할일 목록 추가
//     function addNewTask(){
//         var title = $('#inputTitle').val();
//         var content = $('#inputContent').val();
//         if (title == '' ){
//             alert("제목을 입력해주세요!");
//         }else{

//             // 배열에 새 인자 추가하고 저장
//             arrTitle.push(title);
//             arrContent.push(content);
//             saveItem();

//             // 인풋박스 초기화
//             $('#inputTitle').val('');
//             $('#inputContent').val('');
//             $('#inputTitle').focus();
//         }
//     }

//     $('#button').click(addNewTask);
//     $('#inputTitle').keypress(function(e){
//         if (e.keyCode == 13){
//             addNewTask();
//         }
//     });
//     $('#inputContent').keypress(function(e){
//         if (e.keyCode == 13){
//             addNewTask();
//         }
//     });

//     // 더블클릭하면 인풋창 호출
//     $(document).on('dblclick', '.todo-list-item-title', function(){
//         $(this).hide();
//         $(this).next().show().focus();
//     });
//     $(document).on('dblclick', '.todo-list-item-content', function(){
//         $(this).hide();
//         $(this).next().show().focus();
//     });

//     // 엔터치면 리스트 수정
//     $(document).on('focusout keypress', '.todo-list-item-title-edit', function(e){
//         if (e.type === 'focusout' || e.keyCode === 13){
//             editItem(arrTitle, $(this));
//         }
//     });
//     $(document).on('focusout keypress', '.todo-list-item-content-edit', function(e){
//         if (e.type === 'focusout' || e.keyCode === 13){
//             editItem(arrContent, $(this));
//         }
//     });

//     // 수정된 내용을 저장합니다
//     function editItem(arr, el){
//         var value = el.val();
//         var i = el.attr('index');
//         if (value !== ''){
//             arr.splice(i, 1, value);
//         }
//         saveItem();
//         el.prev().show();
//         el.hide();
//     }

//     // 목록 삭제
//     $(document).on('click', '.todo-list-item-remove', function(){
//         var i = $(this).attr('index');
//         arrTitle.splice(i, 1);
//         arrContent.splice(i, 1);
//         saveItem();
//     });

//     // 저장
//     $('#saveBtn').click(function(){
//         saveItem();
//         alert('저장되었습니다!');
//     });

//     // 지금의 배열을 저장합니다
//     function saveItem(){
//         if(arrTitle.length == 0 && arrContent.length == 0){
//             localStorage.clear();
//         }else{
//             localStorage.setItem('titles', arrTitle);
//             localStorage.setItem('contents', arrContent);
//         }
//         renderItem();
//     }

//     // 저장된 배열을 리스트로 뿌립니다
//     function renderItem(){
//         $('#list').html('');
//         var titles = localStorage.getItem('titles');
//         var contents = localStorage.getItem('contents');

//         if (titles !== null && contents !== null){
//             arrTitle = titles.split(',');
//             arrContent = contents.split(',');
//             for (var i=0; i<arrTitle.length; i++){
//                 var title = arrTitle[i];
//                 var content = arrContent[i];

//                 $('#list').append(getTemplate(title, content, i));
//             }
//         }
//     }

//     $('#loadBtn').click(renderItem);

//     // 초기화
//     $('#resetBtn').click(function(){
//         arrTitle = [];
//         arrContent = [];
//         saveItem();
//     });

//     // 처음에 저장소 로드
//     $(document).ready(renderItem);


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
    }
    var month = getFullMonth(now.getMonth()+1);
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();

    return year+'-'+month+'-'+date+' '+hour+':'+minute;
}

// 배열 선언
var itemsArr = [];

// 스토리지에서 마지막 시퀀스 번호 따기
function getLastSeq(){
    var storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems == null){
        return 0;
    }else if(storedItems.length > 0){
        return storedItems.pop().seq;
    }
}

// 새 게시물 등록
function addNewCol(){
    var titleVal = inputTitle.val();
    var contentVal = inputContent.val();

    if (titleVal == ''){
        alert('제목을 입력해주세요!');
    }else if(contentVal == ''){
        alert('내용을 입력해주세요!')
    }else if (titleVal !== '' && contentVal !== ''){
        var item = {
            seq: getLastSeq()+1, // 마지막 시퀀스 번호 +1 부여
            title: titleVal,
            content: contentVal,
            date: getNow()
        };
        itemsArr.push(item);
    
        console.log(itemsArr);

        saveItem();
    }
}

// 저장 버튼에 이벤트 바인딩
saveBtn.click(addNewCol);

// 스토리지에 배열 저장하고 렌더링
function saveItem(){
    localStorage.setItem('items', JSON.stringify(itemsArr));
    renderItem();
}

// DOM엘리먼트 템플릿 등록
function getTemplate(url, seq, title, date){
    return '<li class="column-item"><a class="column-item-anchor" href="'+url+'" target="_blank"><div class="column-item-num"><span>'+seq+'</span></div><div class="column-item-title"><span>'+title+'</span></div><div class="column-item-date"><span>'+date+'</span></div></a></li>';
}

// 렌더링
function renderItem(){
    colList.html('');
    var storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems !== null){
        itemsArr = storedItems;
        storedItems.forEach(function(e){
            colList.append(getTemplate(replaceUrl(e.seq), e.seq, e.title, e.date));
        });
    }
}

// url주소 치환
function replaceUrl(n){
    var url = window.location.href;
    return (url.replace('board.html', 'column.html'))+'?seq='+n;
}

// 스토리지에 있는거 뿌려주는 로직
var colTitle = $('#colTitle');
var colContent = $('#colContent');

function loadCol(){
    var storedItems = JSON.parse(localStorage.getItem('items'));
    var url = window.location.href;
    var seqNum = url.split('?seq=')[1];
    for (var i=0; i<storedItems.length; i++){
        if (storedItems[i].seq == seqNum){
            colTitle.html(storedItems[i].title);
            colContent.html(storedItems[i].content);
        }
    }
}

$(document).ready(function(){
    renderItem();
    loadCol();
});


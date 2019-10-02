$(function(){ 
  function buildHTML(message){
    var image = (message.image.url) ? `<img class= "lower-message__image" src=${message.image.url} >` : "";
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${image} >
       </div>`
     return html;
   } 
$('.new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')

 $('#chat-footer__send-btn').removeAttr('data-disable-with');

 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('#new_message')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   $("#message").prop("disabled", true);
});

var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
   last_message_id = $('.message:last').data("message-id")
   $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url:"api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
   })
   .done(function(messages) {
     var insertHTML = '';
     messages.forEach(function (message) {
      
      insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
    })
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  })
  .fail(function() {
  });
 }
};
setInterval(reloadMessages, 5000);
});
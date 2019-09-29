$(function() {

  function AddUser(user){
    var html = `<p>
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>
                </p>`

                
    return html;
  }
 
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
   .done(function(data) {

     $(".listview.js-lazy-load-images").empty();
     if (data.length !== 0) {
       data.forEach(function(user){

        var html = AddUser(user);
    
        $('#user-search-result').append(html)
       });
     }
     else {
       appendErrMsgToHTML("ユーザー検索に失敗しました");
     }
   })
   .fail(function() {
    alert('ユーザー検索に失敗しました');
  })
  });

  var chat_member = $('.chat-group-form__search_delete')

  function RemoveUser(id,name){
  var html = `<p>
                <div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
              </p>`              
            chat_member.append(html)
  return html;
  }
  

  $(document).on("click",".user-search-add",function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
  　$(".chat-group-user").remove();
    RemoveUser(id,name)
  });
  $(document).on("click",".user-search-remove",function() {
    $(".chat-group-form__search_delete").remove();
    });
  
 });

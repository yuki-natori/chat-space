$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main_contents box" data-message-id=${message.id}>
        <div class="main_contents_box">
          <div class="main_contents_box_log">
            <div class="main_contents_box_log_name">
              ${message.user_name}
            </div>
            <div class="main_contents_box_log_time">
              ${message.created_at}
            </div>
          </div>
          <div class="main_contents_box_massege">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>
      </div>`
     return html;
   } else {
     var html =
      `<div class="main_contents box" data-message-id=${message.id}>
        <div class="main_contents_box">
          <div class="main_contents_box_log">
            <div class="main_contents_box_log_name">
              ${message.user_name}
            </div>
            <div class="upper-message_log_time">
              ${message.created_at}
            </div>
          </div>
          <div class="main_contents_box_massege">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
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
    $('.main_contents_box_masseges').append(html);      
    $('form')[0].reset();
    $('.box').animate({'height' : '200px'});
    $('.main_contents_box_masseges').animate({ scrollTop: $('.main_contents_box_masseges')[0].scrollHeight});
    $(".main_footer_contents_massege_submit_picter_send").prop('disabled', true);
    $(".main_footer_contents_massege_submit_picter_send").prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});

})
});

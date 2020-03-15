$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="main_contents" data-message-id= ${message.i} >
      <div class="main_contents_box">
        <div class="main_contents_box_log">
          <div class="main_contents_box_log_name">
            ${message.user_nam}
          </div>
          <div class="main_contents_box_log_time">
          </div>
        </div>
        <div class="main_contents_box_massege">
          <p class="lower-message__content">
            ${message.conten}
          </p>
          <img src=" ${message.image} " class="lower-message__image" >
        </div>
      </div>
    </div>`
  } else if (message.content) {
    var html = `<div class="main_contents" data-message-id= ${message.id} >
      <div class="main_contents_box">
        <div class="main_contents_box_log">
          <div class="main_contents_box_log_name">
            ${message.user_nam}
          </div>
          <div class="main_contents_box_log_time">
            ${message.created_a}
          </div>
        </div>
        <div class="main_contents_box_massege">
          <p class="lower-message__content">
            ${message.conten}
          </p>
        </div>
      </div>
    </div>`
  } else if (message.image) {
    var html = `<div class="message" data-message-id= ${message.i} >
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_nam}
        </div>
        <div class="upper-message__date">
          ${message.created_a}
        </div>
      </div>
      <div class="lower-message">
        <img src=" ${message.imag} " class="lower-message__image" >
      </div>
    </div>`
  };
  return html;
};

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
    $('.main_contents_box_masseges').animate({ scrollTop: $('.main_contents_box_masseges')[0].scrollHeight});
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })

})

  var reloadMessages = function() {
  var last_message_id = $('.message:last').data("message-id");
 
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages){
    if (messages.length !== 0) {
    var insertHTML = '';
    $.each(messages, function(i,message) {insertHTM= buildHTML(message)});
    $('.main_contents_box_masseges').append(insertHTML);
    $('.main_contents_box_masseges').animate({ scrollTop: $('.main_contents_box_masseges')[0].scrollHeight});
      }
  })
  .fail(function() {
    alert('error');
  })
}
  if (document.location.href.match(/\/groups\/\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

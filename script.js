jQuery(document).ready(function(){
  // done typing handler
  function uploadProgressHandler(event) {
    $("#loaded_n_total").html("Uploaded " + event.loaded + " bytes of " + event.total);
    var percent = (event.loaded / event.total) * 100;
    var progress = Math.round(percent);
    $("#uploadProgressBar").html(progress + " percent na ang progress");
    $("#uploadProgressBar").css("width", progress + "%");
    $("#status").html(progress + "% uploaded...");
}

function loadHandler(event) {
    $("#status").html(event.target.responseText);
    $("#uploadProgressBar").css("width", "0%");
}

function errorHandler(event) {
    $("#status").html("Upload Failed");
}

function abortHandler(event) {
    $("#status").html("Upload Aborted");
}
  $('#upload-input').on('change',function(){
    var uploadInput = $('#upload-input');
    if(uploadInput.val() != ''){
        var formData = new FormData();
        formData.append('image',uploadInput[0].files[0]);
        // make ajax request to send image to database
        $.ajax({
            url: '/uploadImage',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
              var xhr = new window.XMLHttpRequest();
              xhr.upload.addEventListener("progress",
                  uploadProgressHandler,
                  false
              );
              xhr.addEventListener("load", loadHandler, false);
              xhr.addEventListener("error", errorHandler, false);
              xhr.addEventListener("abort", abortHandler, false);

              return xhr;
          },
            success: function(){
                uploadInput.val('');
            }
        })
    }
})

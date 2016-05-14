$(function(){
	$('#upload').click(function(){
		console.log('upload start--');
		var data = new FormData();
		var files = $("#file1")[0].files;
		if (files) {
			data.append("file",files[0]);
		}
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/uploadImg',
			data: data,
			contentType:false,
			processData:false,
			success:function(results){
				 $('.img-circle').attr('src',results.path);
				 console.log(results.path);
			}
		})
	})
})

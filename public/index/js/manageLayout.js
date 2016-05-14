$(function(){
	var groupId;
	$('#popo').hide();
	$('#mask').hide();
	$('#photo').hide();
	$('.deleteGroup').bind('click',function(){
		var id = $(this).parent().attr('id');
		$.ajax({
			type: "POST",
			url: "/deleteGroup",
			dataType: "json",
			data: {"id":id},
			success: function(results){
				if(results.success == 1){
					console.log("this.parent.remove start");
					$('#'+id).remove();
				}
			}
		})
	})
	$('.queryGroupers').bind('click',function(){
		var id = $(this).parent().attr('id');
		$('#'+id).children('div.displayGroupers').html('');
		$.ajax({
			type: "POST",
			url: "/queryGroupers",
			dataType: "json",
			data: {"id":id},
			success:function(results){
				if (results.success == 1) {
					var members = results.gus;
					console.log(results.gus.length);
					for (var i = 0; i < members.length; i++) {
						
						$('#'+id).children('div.displayGroupers').append(members[i].name);
					}
				}
			}
		})
	})
	$('.saveGrouper').bind('click',function(){
		$('#popo').show();
		$('#mask').show();
		$('#photo').show();
		groupId = $(this).parent().attr('id');
	})
	$('#mask').bind('click',function(){
		$('#popo').hide();
		$('#mask').hide();
		$('#photo').hide();
	})
	$('#confirm').bind('click',function(){
		$('#popo').hide();
		$('#mask').hide();
		$('#photo').hide();
		var userName = $('#userName').val();		
		$.ajax({
			type: "POST",
			url: "/saveGrouper",
			dataType: "json",
			data: {
				"id":groupId,
				"userName":userName
			},
			success:function(results) {
				if (results.success == 1) {
					if (results.userState == 0) {
						alert("用户不存在");
					}else if(results.userState == 1){
						alert("用户已在该组中");
					}else if(results.userState == 2){
						alert("邀请成功");
					}else{
						alert("发生错误");
					}
				}else{
					alert("邀请失败");
				}
			}
		})
	})
	$('#userName').change(function(){
		$('#sculpture').attr('src','/image/loading.gif');
		$('#name').html('');
		var userName = $(this).val();
		$.ajax({
			type: "POST",
			url: "/queryUser",
			dataType: "json",
			data: {
				"userName":userName
			},
			success:function(results){
				$('#sculpture').attr('src',results.user.sculpture);
				$('#name').append("用户名："+results.user.name);
				$('#name').append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称："+results.user.nickName);
			}
		})
	})
})
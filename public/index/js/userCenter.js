$(function(){
	var mask = $('#mask');
	var set = $('#set');
	var setPhoto = $('#setPhoto');

	var nickNameSet = $('#deskUserNickNameSet');
	var userOldSet = $('#deskUserOldSet');
	var userEmailSet = $('#deskUserEmailSet');
	var userUniqueSet = $('#deskUserUniqueSet');
	var save = $('#deskUserSave');

	var nickName = $('#deskUserNickName');
	var userOld = $('#deskUserOld');
	var userEmail = $('#deskUserEmail');
	var userUnique = $('#deskUserUnique');
	var pic=$('#pic');
	var flag = 0;

	mask.css('display','none');
	set.css('display','none');
	setPhoto.css('display','none');
	nickNameSet.css('display','none');
	userOldSet.css('display','none');
	userEmailSet.css('display','none');
	userUniqueSet.css('display','none');
	save.css('display','none');

	pic.bind('mouseover',function(){
		mask.css('display','block');
		set.css('display','block');
		setPhoto.css('display','block');
	})
	pic.bind('mouseout',function(){
		mask.css('display','none');
		setPhoto.css('display','none');
		set.css('display','none');
	})		
	mask.bind('mouseover',function(){
		mask.css('display','block');
		set.css('display','block');
		setPhoto.css('display','block');
	})
	mask.bind('mouseout',function(){
		mask.css('display','none');
		set.css('display','none');
		setPhoto.css('display','none');
	})
	set.bind('mouseover',function(){
		mask.css('display','block');
		set.css('display','block');
		setPhoto.css('display','block');
	})
	setPhoto.bind('mouseover',function(){
		mask.css('display','block');
		set.css('display','block');
		setPhoto.css('display','block');
	})

	set.bind('click',function(){
		if(flag == 0){
			nickName.fadeOut();
			userOld.fadeOut();
			userEmail.fadeOut();
			userUnique.fadeOut();
			pic.css('transform','rotate(360deg)');
			set.css('left','645px');
			set.html('返回');

			nickNameSet.fadeIn();
			userOldSet.fadeIn();
			userEmailSet.fadeIn();
			userUniqueSet.fadeIn();
			save.fadeIn();
			flag = 1;
		}else{
			nickName.fadeIn();
			userOld.fadeIn();
			userEmail.fadeIn();
			userUnique.fadeIn();
			pic.css('transform','rotate(0deg)');
			set.css('left','628px');
			set.html('设置所有');

			nickNameSet.fadeOut();
			userOldSet.fadeOut();
			userEmailSet.fadeOut();
			userUniqueSet.fadeOut();
			save.fadeOut();
			flag = 0;
		}		
	})		
})
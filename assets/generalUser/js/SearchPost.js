$(document).ready(function(){

	$('input[type=button]').click(function(){
		let jsonsend = {
			"text" : $('#text').val()
		}
		$.ajax({
			url: '/userController/AjaxSearchPost',
			type: 'GET',
			dataType:'json',
			data: jsonsend,
			success: function(response){
				$("#result").html(response.result);
			},
			error: function(error){

			}
		});

	});			
});
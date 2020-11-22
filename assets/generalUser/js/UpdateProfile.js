$(document).ready(function(){
	
	$('input[type=button]').click(function(){
		let jsonsend = {
			"guid" : $('#guid').val(),
			"name" : $('#name').val(),
			"email" : $('#email').val(),
			"dob" : $('#dob').val(),
			"address" : $('#address').val()
		}
		$.ajax({
			url: '/userController/UpdateProfile',
			type: 'POST',
			dataType:'json',
			data: jsonsend,
			success: function(response){
				if(response)
				{
					$('#guid').val('');
					$('#name').val('');
					$('#email').val('');
					$('#dob').val('');
					$('#address').val('');
					$("#result").html(response.result);
				}
				else
				{
					$("#result").html('Failed, please try again to send..');
				}
			},
			error: function(error){

			}
		});

	});			
});
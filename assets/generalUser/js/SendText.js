$(document).ready(function(){
	
	$('input[type=button]').click(function(){
		let jsonsend = {
			"receiverid" : $('#receiverid').val(),
			"text" : $('#text').val()
		}
		$.ajax({
			url: '/userController/SendText',
			type: 'POST',
			dataType:'json',
			data: jsonsend,
			success: function(response){
				if(response)
				{
					$('#receiverid').val('');
					$('#text').val('');
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
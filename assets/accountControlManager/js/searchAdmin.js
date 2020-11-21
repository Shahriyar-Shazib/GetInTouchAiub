$(document).ready(function(){
	$('input[type=button]').click(function(){
		let jsonsend = {
			"key" : $('input[type=text]').val()
		}
		$.ajax({
			url: '/acadmincontroller/searchadmin',
			type: 'GET',
			dataType:'json',
			data: jsonsend,
			success: function(response){
				$("#searchresult").html(response);
			},
			error: function(error){

			}
		});

	});			
});
$(document).ready(function(){

	//Bind search function
	$("#searchBar").on('keypress',function(e){
		if(e.which == 13){
			window.location.href = "../search.html?search="+$("#searchBar").val();
		}
	});
});
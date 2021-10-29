const LoadCount = 12;

$(document).ready(function(){

	//Bind search function
	$("#mainSearch").on('keypress',function(e){
		if(e.which == 13){
			window.location.href = "../search.html?search="+$("#mainSearch").val();
		}
	});
	GetResults();
});

function GetResults(){
	
	//Check if there are search parameters
	const params = new URLSearchParams(document.location.search);
	const target = params.get("search");

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			//get json back
			var response = this.responseText;
			//Parse
			try {
				var results = JSON.parse(response);
			} catch (error) {
				$("#searchResults").html("<h1>No ebooks found...</h1>");
				return;
			}
			if(results.length == 0){
				$("#searchResults").html("<h1>No ebooks found...</h1>");
				return;
			}

			//Iterate through and fill rated
			for (let i = 0; i < results.length; i++){
				var element = "<div class=productItem>"
					+ "<img src='"+( !results[i].image ? "img/placeholder.jpg" : results[i].image )+"'/>"
					+ "<h2>"+results[i].title+"</h2>"
					+ "<p>Volume: "+results[i].volume+"</p>"
					+ "<p>Revision: "+results[i].revision+"</p>"
					+ "<button class='viewBtn' onclick=\"location.href='product.html?productId="+results[i].id+"'\">View</button>"
					+ "</div>";
				$("#searchResults").append(element);
			}
		}
	}


	var url;
	if(target){
		console.log("Parameters found");
		url = "php/search.php?search="+target+"&count="+LoadCount;
		$("#mainSearch").val(target);
	}//Else get top rated
	else{
		console.log("No parameters")
		url = "php/GetRatedProducts.php?count="+LoadCount;
	}
	console.log("Calling php script: "+url)
	xhr.open("GET", url, true);
	xhr.send();
}
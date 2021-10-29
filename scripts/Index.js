const LoadCount = 12;

$(document).ready(function(){
	LoadIndexProductsRated();
	LoadIndexProductsSale();
});

function LoadIndexProductsRated(){
	console.log("Attempting to load rated index Products");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			//get json back
			var response = this.responseText;
			//Parse
			var results = JSON.parse(response);

			//Iterate through and fill rated
			for (let i = 0; i < LoadCount; i++){
				var element = "<div class=productItem>"
					+ "<img src='"+( !results[i].image ? "img/placeholder.jpg" : results[i].image )+"'/>"
					+ "<h2>"+results[i].title+"</h2>"
					+ "<p>Volume: "+results[i].volume+"</p>"
					+ "<p>Revision: "+results[i].revision+"</p>"
					+ "<button class='viewBtn' onclick=\"location.href='product.html?productId="+results[i].id+"'\">View</button>"
					+ "</div>";
				$("#topRated").append(element);
			}
		}
	}

	//Build URL
	var url = "php/GetRatedProducts.php?count="+LoadCount;
	console.log("Calling php script: "+url);
	xhr.open("GET", url, true);
	xhr.send();
}

function LoadIndexProductsSale(){
	console.log("Attempting to load sale index Products");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			//get json back
			var response = this.responseText;
			//Parse
			var results = JSON.parse(response);

			//Iterate through and fill rated
			for (let i = 0; i < results.length; i++){
				var element = "<div class=productItem>"
					+ "<img src='"+( !results[i].image ? "img/placeholder.jpg" : results[i].image )+"'/>"
					+ "<h2>"+results[i].title+"</h2>"
					+ "<p>Volume: "+results[i].volume+"</p>"
					+ "<p>Revision: "+results[i].revision+"</p>"
					+ "<button class='viewBtn' onclick=\"location.href='product.html?productId="+results[i].id+"'\">View</button>"
					+ "</div>";
				$("#onSale").append(element);
			}
		}
	}

	//Build URL
	var url = "php/GetSaleProducts.php?count="+LoadCount;
	console.log("Calling php script: "+url);
	xhr.open("GET", url, true);
	xhr.send();
}
export function LoadProducts(URL, target){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			//get json back
			var response = this.responseText;
			//Parse
			try {
				var results = JSON.parse(response);
			} catch (error) {
				$(target).html("<h1>No ebooks found...</h1>");
				return;
			}
			if(results.length == 0){
				$(target).html("<h1>No ebooks found...</h1>");
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
				$(target).append(element);
			}
		}
	}

	xhr.open("GET", URL, true);
	xhr.send();
}
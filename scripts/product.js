$(document).ready(function(){
	LoadProductDetails();
});

function LoadProductDetails() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			//get json back
			var response = this.responseText;
			//Parse
			var product = JSON.parse(response);

			//Fill in details
			$("#productName").html(product.title);
			if(product.image != null)
				$("#productImage").attr("src", product.image);
			$("#productVol").append(product.volume);
			$("#productRev").append(product.revision);
			$("#productFran").append(product.franchise);
			$("#productYear").append(product.year);
			$("#productRating").append(product.rating+"/5");
			//Price
			var formatter = new Intl.NumberFormat('en-AU',{
				style: 'currency',
				currency: 'AUD'
			});
			if(product.salePrice != null){
				$("#productPrice").append("<del>"+formatter.format(product.price)+"</del>");
				$("#salePrice").html(formatter.format(product.salePrice));
			}
			else{
				$("#productPrice").append(formatter.format(product.price));
			}
		}
	}

	//Get ID
	const params = new URLSearchParams(document.location.search);
	const id = params.get("productId");

	//Build URL
	var url = "php/ProductDetailsByID.php?productId="+id;
	xhr.open("GET", url, true);
	xhr.send();
}

function addToCart() {
	//Get username
	var username = "test"; //temporary. implement this later so it grabs the logged in username
	
	//Get product ID
	const params = new URLSearchParams(document.location.search);
	const id = params.get("productId");

	// Check if cookie exists for the current user
	var cookie = getCookie(username);
	if (cookie === "") { // create a new cookie
		setCookie(username, id, 1);
	}
	else { 	// append cookie
		const tokens = cookie.split('=');	// get cookie value
		var newValue = tokens[1] + "," + id; // add the new id to the value
		setCookie(username, newValue, 1);
	}

	//debug - alerts the cookie assinged to the user
	var cookie = getCookie(username);
	alert(cookie);

}

function setCookie(key, value, expireDays) {
	// set expirate date
	const d = new Date();
	d.setTime(d.getTime() + (expireDays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();

	// make cookie
	document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function getCookie(key) {
	// username=
	const prefix = key + "=";
	// retrieve cookies
	const cookiesDecoded = decodeURIComponent(document.cookie);
	// split cookies
	const cookiesArr = cookiesDecoded.split('; ');

	// find cookie
	for (let i = 0; i < cookiesArr.length; i++) {
		let cookie = cookiesArr[i];
		
		// skip spaces
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1);
		}

		// grab specified cookie name
		if (cookie.indexOf(prefix) == 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}

	//cookie not found
	return "";

}
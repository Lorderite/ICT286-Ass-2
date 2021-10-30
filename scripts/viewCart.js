//to do - handle duplicates

var total = 0;

$(document).ready(function(){
	LoadCart();
});

function LoadCart() {
	var username = "test"; //temporary. implement this later so it grabs the logged in username

	// Load Products
	var cookie = getCookie(username);
	const tokens = cookie.split('='); // get cookie value
	const IDArray = tokens[1].split(','); //split the IDs
	for (let i = 0 ; i < IDArray.length; i++) {
		LoadCartProduct(IDArray[i]);
	}
}

function LoadCartProduct(ID) {

	var html = "";
	var quantity = 0;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){

			// get json back
			var response = this.responseText;
			// parse
			var product = JSON.parse(response);

            // fill in details (only need title, image, volume, revision, price)
			html += "<tr>";
			html += "<th>" + "<img src=\"" + product.image + "\" id=\"cartImage\">" + "</th>";
			html += "<th>" + product.title + " vol." + product.volume + " rev." + product.revision +  "</th>";
			html += "<th>" + quantity + "</th>";
			//Price
			var formatter = new Intl.NumberFormat('en-AU',{
				style: 'currency',
				currency: 'AUD'
			});

            if(product.salePrice != null){
				html += "<th>" + formatter.format(product.salePrice) + "</th>";
				total += parseFloat(product.salePrice);
			}
			else{
				html += "<th>" + formatter.format(product.price) + "</th>";
				total += parseFloat(product.price);
            }

			// remove button
			html += "<th><button type=\"button\" id=\"" + product.id + "\" class=\"cartRemoveBtn\" onclick=\"removeProduct(this.id);\">Remove</button></th>";

			// append to table
			$("#cartTable").append(html);

			$("#totalPrice").text(formatter.format(total));
        }
    }

	//Build URL
	var url = "php/ProductDetailsByID.php?productId="+ ID;
	xhr.open("GET", url, true);
	xhr.send();

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

function removeProduct(id) {
	var username = "test"; //temporary. implement this later so it grabs the logged in username

	if (confirm("Are you sure you remove this item from your cart?")) {
		var cookie = getCookie(username);
		const tokens = cookie.split('='); // get cookie value
		const IDArray = tokens[1].split(','); //split the IDs
	
		for (let i = 0 ; i < IDArray.length; i++) {
			
			// remove the id
			if (IDArray[i] == id) {
				IDArray.splice(i, 1);
			}
		}
	
		// rebuild cookie
		setCookie(username, IDArray, 1);
	
		// reload page
		location.reload();

	}

}

function clearCart() {
	var username = "test"; //temporary. implement this later so it grabs the logged in username

	if (confirm("Are you sure you want to clear your cart?")) {
		document.cookie = username + "=;path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		//reload page
		location.reload();
	}

}
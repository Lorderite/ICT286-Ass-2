$(document).ready(function(){
	LoadProductDetails();
});

function LoadProductDetails(){
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
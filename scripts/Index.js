import { LoadProducts } from "./LoadProducts.js";

const LoadCount = 12;
const AutoLoad = 6;

$(document).ready(function(){
	LoadIndexProductsRated();
	LoadIndexProductsSale();

	//Auto load on scroll
	var offset = 0;
	$(window).scroll(function(){
		if($(window).scrollTop() == $(document).height() - $(window).height()){
			LoadAllProductsBounds(offset, AutoLoad);
			offset+=AutoLoad;
		}
	});
});

function LoadIndexProductsRated(){

	//Build URL
	var url = "php/GetRatedProducts.php?count="+LoadCount;
	LoadProducts(url, "#topRated");
}

function LoadIndexProductsSale(){
	//Build URL
	var url = "php/GetSaleProducts.php?count="+LoadCount;
	LoadProducts(url, "#onSale");
}

function LoadAllProductsBounds(offset, count){
	//Build URL
	var url = "php/GetAllProductsRange.php?offset="+offset+"&count="+count;
	console.log("Calling: "+url);
	LoadProducts(url, "#allProducts", true);
}
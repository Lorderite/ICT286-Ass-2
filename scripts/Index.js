import { LoadProducts } from "./LoadProducts.js";

const LoadCount = 12;

$(document).ready(function(){
	LoadIndexProductsRated();
	LoadIndexProductsSale();
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
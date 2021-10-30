$(document).ready(function ()
{
	// open default tab
	document.getElementById("defaultTab").click();

	//Check if someone is logged in

	//if logged in show them profile control

	//Else show normal page

});


function Login()
{

	var accountIn;

	//Retreive from text boxes
	const username = $("#username").val();
	const password = $("#password").val()

	//Check if it is in database
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function ()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			//Get response
			var response = this.responseText;

			//If response valid parse it
			console.log("Response: " + response);
			if (response !== "")
			{
				console.log("Parsing data");
				accountIn = JSON.parse(response);

				//If password valid store login in cookie / Update cookie if it exists
				if (password == accountIn.password)
				{
					var account = new Object();
					account.username = accountIn.username;
					account.type = accountIn.type;
					var json_str = JSON.stringify(account);
					createCookie("login", account, 1); //it also overwrites/updates cookie that has login as the key
				} else
				{ //if invalid tell the user off
					document.getElementById("loginAlert").innerText = "Incorrect password";
				}
			}
			else
			{ //if invalid tell the user off
				document.getElementById("loginAlert").innerText = "No Account Found";
			}

		}
	}

	var url = "php/GetLoginDetails.php?username=" + username;
	console.log("Requesting login: " + url);
	xhr.open("GET", url);
	xhr.send();


}

function Signup()
{
	//Retreive from text boxes

	//Check if account it is in database

	// if not add a new account to the database

}

function openTab(event, process) {
	var tablinks = document.getElementsByClassName("tablinks");
	var tabcontent = document.getElementsByClassName("tabcontent");

	// hide tab content
	for (var i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// remove active class
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// show current tab
	document.getElementById(process).style.display = "block";
	event.currentTarget.className += " active";

}

function createCookie(key, value, expireDays)
{
	// set expirate date
	const d = new Date();
	d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();

	// make cookie
	document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function getCookie(key)
{
	// username=
	const prefix = key + "=";
	// retrieve cookies
	const cookiesDecoded = decodeURIComponent(document.cookie);
	// split cookies
	const cookiesArr = cookiesDecoded.split('; ');

	// find cookie
	for (let i = 0; i < cookiesArr.length; i++)
	{
		let cookie = cookiesArr[i];

		// skip spaces
		while (cookie.charAt(0) == ' ')
		{
			cookie = cookie.substring(1);
		}

		// grab specified cookie name
		if (cookie.indexOf(prefix) == 0)
		{
			return cookie.substring(prefix.length, cookie.length);
		}
	}

	//cookie not found
	return "";

}
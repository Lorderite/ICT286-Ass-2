<?php
	//Get database connection
	ob_start();
	require 'connection.php';
	ob_end_clean();

	//SQL prep
	$username = $_GET['username'];
	$password = $_GET['password'];
	$email = $_GET['email'];

	//Check if account exists
	//SQL prep
	$sql = "SELECT * FROM account WHERE Username = \"$username\";";

	//Run Query
	$result = mysqli_query($conn, $sql);

	//Make sure result is empty
	if(mysqli_num_rows($result) != 0) {
		echo "";
		exit();
	}

	$sql = "INSERT INTO `account` (`Username`, `Password`, `Email`, `Type`) VALUES ('$username', '$password', '$email', '1');";

	//Run Query
	if(mysqli_query($conn, $sql)) {
		echo true;
	}else{
		echo false;
	}
?>
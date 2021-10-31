<?php
	//Get database connection
	ob_start();
	require 'connection.php';
	ob_end_clean();

	//SQL prep
	$username = $_GET['username'];
	$password = $_GET['password'];
	$email = $_GET['email'];
	$sql = "UPDATE `account` SET `Password`='$password',`Email`='$email' WHERE username = '$username';";

	//Run Query
	if(mysqli_query($conn, $sql)) {
		echo true;
	}else{
		echo false;
	}
?>
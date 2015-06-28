<?php
include("config.php");
	$name = $_POST["name"];
	$score = $_POST["score"];
	$sql = "INSERT INTO scoreboard(name,score)
			VALUE('$name','$score')";
	$conn->query($sql);
	$conn->close();
?>
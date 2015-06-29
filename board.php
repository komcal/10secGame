<?php
header("Content-type: text/html; charset=utf-8");
include("config.php");
echo'<link type="text/css" rel="stylesheet" href="style.css">';
class people{
	function insert($i,$name,$score)
	{
		$this->name[$i] = $name;
		$this->score[$i] = $score;
	}
	
}
	
	$sql = "SELECT name,score FROM scoreboard
	ORDER BY score";
	$result = $conn->query($sql);
	$i = 0;
	$p = new people();
	while($row = $result->fetch_assoc())
	{
		$p->insert($i,$row['name'],$row['score']);
		$i++;
	}
	$i--;
	echo("<div class='scorehead'>" . SCORE . "</div>");
	echo("<table>");	
	for($i,$j = 1 ; $i >=0 ; $i--,$j++)
	{
		if($j < 11)
		{
			
			echo("<tr>");
			echo("<td class='tdnum'>" . $j ."</td>");
			echo("<td class='tdname'>" . $p->name[$i] ."</td>");
			echo("<td class='tdscore'>" . $p->score[$i] ."</td>");
			echo("</tr>");
		}
		
	}
	echo("</table>");
	echo('<a href="http://www.komcal.com/game/10secgame/">back to game</a>');
?>
<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("cPr");
    	
	// 1. connessione
    $con=_connection("prevenditeproject");
	
	// 2. Lettura parametri 
	$id = $_SESSION["cPr"];
	
	// 3. Query
    $sql="select nominativo from tabpr where codPR = $id;";
	$user = _eseguiQuery($con, $sql);
	$sql = "SELECT codPR, nominativo FROM tabpr WHERE codCapo = $id;";
    $data = _eseguiQuery($con, $sql);
	$data = array("name"=>$user[0]["nominativo"], "data"=>$data, "prCorrente"=>$id);
	echo json_encode($data);
    
	// 4. close
    $con->close();
?>
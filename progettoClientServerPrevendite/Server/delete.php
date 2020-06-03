<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("cPr");
	
	// controllo parametri
    if (!isset($_REQUEST["id"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (id).");
    }
	
   	// 1. connessione
	$con=_connection("prevenditeproject");
	
	// 2. Lettura parametri
    $id = $con->real_escape_string($_REQUEST["id"]);
	
    // 3. Query per persone inserite
    $sql = "DELETE FROM tabinvitati WHERE codInvitati='$id'";
    $ris = _eseguiQuery($con,$sql);
    echo $ris;
    $con->close();
?>
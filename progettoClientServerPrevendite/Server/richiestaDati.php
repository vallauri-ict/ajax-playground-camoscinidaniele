<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("cPr");
	
	// controllo parametri
    if (!isset($_REQUEST["idCorrente"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (idCorrente).");
    }
	
   	// 1. connessione
	$con=_connection("prevenditeproject");
	
	// 2. Lettura parametri
    $user = $con->real_escape_string($_REQUEST["idCorrente"]);
 
	
    // 3. Query per persone inserite
    $sql = "SELECT codInvitati, nominativo, dataDiNascita FROM tabinvitati WHERE codPr = $user";
    $inseriti = _eseguiQuery($con, $sql);
    
    $sql = "SELECT codPR FROM tabpr WHERE codCapo = $user";
    $sotto = _eseguiQuery($con, $sql);
    
    $data = array("inseriti"=>$inseriti, "sotto"=>$sotto);
    echo json_encode($data);
    $con->close();
?>
<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("cPr");
	
	// controllo parametri
    if (!isset($_REQUEST["nominativo"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (nominativo).");
    }
    if (!isset($_REQUEST["dataNascita"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (dataNascita).");
    }
    if (!isset($_REQUEST["codPR"]))
    {
        $con->close();
        http_response_code(400);
        die ("Parametro mancante (codPR).");
    }
	
   	// 1. connessione
	$con=_connection("prevenditeproject");
	
	// 2. Lettura parametri
    $nome = $con->real_escape_string($_REQUEST["nominativo"]);
    $dataN=$con->real_escape_string($_REQUEST["dataNascita"]);
    $codPr=$con->real_escape_string($_REQUEST["codPR"]);
	
    // 3. Query per persone inserite
    $sql = "INSERT INTO tabinvitati (nominativo, dataDiNascita, codPr) VALUES ('$nome','$dataN','$codPr')";
    $ris = _eseguiQuery($con,$sql);
    echo $ris;
    $con->close();
?>
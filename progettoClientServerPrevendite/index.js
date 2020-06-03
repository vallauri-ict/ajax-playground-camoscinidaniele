"use strict";

$(function () {
	let _table=$("#table");
    let _divFiliali = $("#divFiliali");
    let _btnYour = $("#yourData");
    let _sottoPR=$("#sottoPR");
	let isCapo=false;
    let wrapperVisible=false;
    let _statsHead=$("#statsHead");
    let _wrapperIn=$("#insertWrapper");
    let _btnAggiungi=$("#btnAggiungi");
    let _btnRimuovi=$("#btnRimuovi");
	let codCorrente;
    
    
	initialization();
	_sottoPR.on("change",function(){
        if(this.value!="NO"){
            $(".nav-item").removeClass("active");
            $(this).parent().addClass("active");
            _btnAggiungi.addClass("disabled");
            _btnRimuovi.addClass("disabled");
            _statsHead.text("Le statistiche di "+$("#sottoPR option:selected").text());
            $(".rrow").remove();
            richiestaDati(this.value);
        }
    })
    _btnYour.click(function(){
        $(".nav-item").removeClass("active");
        $(this).parent().addClass("active");
        _statsHead.text("Le tue statistiche");
        $(".rrow").remove();
        $(".ooption").remove();
        initialization();
    })
	$("#btnLogout").on("click", function(){
		let _richiestaLogout = inviaRichiesta("POST", "server/logout.php");		
		_richiestaLogout.fail(error);
		_richiestaLogout.done(function (data) { 
			if (data["ok"]==true){
				alert("Sei stato disconnesso correttamente");	
			    window.location.href="login.html";
			}
		});
	})
    
    _btnAggiungi.click(function(){
        $(".alert-dismissible").hide();
        if(wrapperVisible){
            wrapperVisible=false;
            _wrapperIn.hide(400,"swing");
        $(this).parent().removeClass("active");
        }
        else{
            wrapperVisible=true;
            _wrapperIn.show(400,"swing");
            $(this).parent().addClass("active");
        }
    })
    
    _btnRimuovi.click(function(){
        $(".alert-dismissible").hide();
        let checkboxes=$(".checkk");
        let areChecked="";
        for(let i=0; i<checkboxes.length; i++){
            if(checkboxes[i].checked)
                areChecked+=checkboxes[i].getAttribute("id").slice(5)+",";
        }
        if(areChecked!=""){
            let removeID=areChecked.split(",");
            let errori=0;
            for(let i=0; i<removeID.length-1; i++){
                let _remove=inviaRichiesta("get","server/delete.php",{"id":removeID[i]});
                _remove.fail(function(jqXHR, test_status, str_error) {
                    errori++;
               });
            }
            if(errori==0){
                $("#lblSuccessRemove").show(200);
            }
            else{
                $("#mexError").text("Si è verificato un errrore nella comunicazione con il database, riprova");
                $("#lblDangerRemove").show(200);
            }
            $(".rrow").remove();
            richiestaDati(codCorrente);
        }
        else{
            $("#mexError").text("Prima occorre selezionare delle persone dalla tabella attraverso le checkbox!");
            $("#lblDangerRemove").show(200);
        }
    })
    
    $(".close").click(function(){
        $(this).parent().hide(200);
    })
    $("#btnInsert").click(function(){
        $("#txtNome").removeClass("is-invalid");
        $("#dataPicker").removeClass("is-invalid");
        let _insert=inviaRichiesta("get","server/insert.php",{"nominativo":$("#txtNome").prop("value"),"dataNascita":$("#dataPicker").prop("value").toString(),"codPR":codCorrente}); 
        _insert.fail(function(jqXHR, test_status, str_error) {
		if (jqXHR.status == 403) {  
			window.location.href="login.html";
		} 
		else
			$("#lblDangerin").show(200);
	   });
        _insert.done(function(){
            $("#lblSuccessin").show(200);
            $(".rrow").remove();
            _statsHead.text("Le tue statistiche");
            richiestaDati(codCorrente);
            
        })
    })
    function richiestaDati(id){
        let _richiestaDati=inviaRichiesta("post","server/richiestaDati.php",{"idCorrente":id},false);
        _richiestaDati.fail(function(jqXHR, test_status, str_error) {
		if (jqXHR.status == 403) {  
			window.location.href="login.html";
		} 
		else
			error(jqXHR, test_status, str_error)
	   });
        let _sotto;
        _richiestaDati.done(function(data){
            if(id==codCorrente){
                let i=0;
                for(let record of data.inseriti){
                    let _tr=$("<tr>").addClass("rrow").appendTo(_table);
                    $("<td>").text(record["nominativo"]).appendTo(_tr);
                    $("<td>").text(record["dataDiNascita"]).appendTo(_tr);
                    let _check=$("<td>").appendTo(_tr);
                    $("<input>").prop("type","checkbox").prop("id","check"+record["codInvitati"]).addClass("checkk").appendTo(_check);
                }
            }
            else{
                for(let record of data.inseriti){
                    let _tr=$("<tr>").addClass("rrow").appendTo(_table);
                    $("<td>").text(record["nominativo"]).appendTo(_tr);
                    $("<td>").text(record["dataDiNascita"]).appendTo(_tr);
                    $("<td>").appendTo(_tr);
                }
            }
            
            $("#spanPersone").text((data.inseriti).length);
            $("#spanSoldi").text((data.inseriti).length*10+"€");
            _sotto=(data.sotto).slice();
            
        })
        let invitatiDaSotto=0;
        
        for(let i=0; i< _sotto.length; i++){
        let _richiestaDatiSotto=inviaRichiesta("post","server/richiestaDati.php",{"idCorrente":_sotto[i]["codPR"]},false);
        _richiestaDatiSotto.fail(function(jqXHR, test_status, str_error) {
        if (jqXHR.status == 403) {  
            window.location.href="login.html";
        } 
        else
            error(jqXHR, test_status, str_error)
        })
        _richiestaDatiSotto.done(function(data){
            invitatiDaSotto+=(data.inseriti).length;
        })
        }
        if(isCapo && _statsHead.text()=="Le tue statistiche")
            invitatiDaSotto-=$("#spanPersone").text();
        $("#spanInseritiSottoPr").text(invitatiDaSotto);
    }
    
    function initialization(){
        
        _wrapperIn.hide();
        _btnAggiungi.removeClass("disabled");
        _btnRimuovi.removeClass("disabled");
        let _inizializzazione = inviaRichiesta("get", "server/inizializzazione.php");
        
	   _inizializzazione.fail(function(jqXHR, test_status, str_error) {
		if (jqXHR.status == 403) {  
			window.location.href="login.html";
		} 
		else
			error(jqXHR, test_status, str_error)
	});
	
	_inizializzazione.done(function (data) {
		console.log(data)
		$("#PrIdent").text(data["name"]);
        if((data.data).length==0){
           $("<option>").text("Non hai sotto PR").addClass("ooption").prop("value","NO").appendTo(_sottoPR.addClass("disabled"));
        }
        else{
            $("<option>").addClass("ooption").text("i tuoi sotto PR").prop("value","NO").appendTo(_sottoPR);
            for(let record of data.data){
                if(record["nominativo"]!=data["name"])
                    $("<option>").text(record["nominativo"]).addClass("ooption").prop("value",record["codPR"]).appendTo(_sottoPR);
                else
                    isCapo=true;
            }
        }
        codCorrente=data["prCorrente"];
        richiestaDati(data["prCorrente"]);
        _statsHead.text("Le tue statistiche");
        if(isCapo){
            $("#btnGestioneEvento").removeClass("disabled");
            
        }

    })
    }
	
});

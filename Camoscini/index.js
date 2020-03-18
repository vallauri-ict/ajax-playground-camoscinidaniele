"use strict";
let range;
let pos=0;
let gender="";
let nation="US";
let date;
let person;
$(document).ready(function(){
    inviaRichiesta("results=1&gender=&nat=US",aggiornaPagina);
    start();
  $("#btnGenerate").click(function() {
    start();
    // alert("ok");
	let param = "results="+range+"&gender="+gender+"&nat="+nation;
    inviaRichiesta(param, aggiornaPagina);
  });
    $("#phrase").html("Hi, my name is");
});
function start()
{
    range=$("#rangeRisultati").val();
    if($("#radio-all").prop("checked")==true)
        gender="";
    else if($("#radio-female").prop("checked")==true)
        gender="female";
    else
        gender="male";
        
    let chk=document.getElementsByName("chkNazione");
    nation="";
    for(let i=0;i<chk.length;i++)
        {
            if($(chk[i]).prop("checked")==true)
                {
                    if(nation=="")
                        nation=$(chk[i]).prop("id").split('-')[1];
                    else
                        nation+=","+$(chk[i]).prop("id").split('-')[1];
                } 
        }
    
}
function inviaRichiesta(parametri, callBack) {
    pos=0;
  $.ajax({
    url: "https://randomuser.me/api", //default: currentPage
    type: "GET",
    data: parametri,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    dataType: "json",
    async: true, // default
    timeout: 5000,
    success: callBack,
    error: function(jqXHR, test_status, str_error) {
      alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
    }
  });
}

function aggiornaPagina(data){
  console.log(data);
    date=data;
  person = data.results[pos];
  let st = person.name.title + " " + person.name.first + " " + person.name.last;
  // alert(st);
  $("#pInfo").html(st);
  $("img").attr("src", person.picture.large);
}

function aggiornaSpan(){
    $("#nCorrente").text($("#rangeRisultati").val());
}
function showProfile() {
    $("#phrase").text("Hi, my name is");
    let st = person.name.title + " " + person.name.first + " " + person.name.last;
    $("#pInfo").html(st);
  $("img").attr("src", person.picture.large);
}

function showEmail() {
    $("#phrase").text("My email adress is");
    let st = person.email;
    $("#pInfo").html(st);
}

function showDob() {
    $("#phrase").text("My birthday is");
    let st = person["dob"]["date"].split("T")[0];
    $("#pInfo").html(st);
}

function showMap() {
    $("#phrase").text("My adress is");
    let st = person["location"]["street"]["number"]+" "+person["location"]["street"]["name"];
    $("#pInfo").html(st);
}

function showCell() {
    $("#phrase").text("My phone number is");
    let st = person["phone"];
    $("#pInfo").html(st);
}

function showPassword() {
    $("#phrase").text("My password is");
    let st = person["login"]["password"];
    $("#pInfo").html(st);
}
function frecciaDX(){
    if(pos != range-1)
    {
        pos++;
        aggiornaPagina(date);
    }
    else
        $("#frecciaDX").prop("disabled","true");
    $("frecciaSX").prop("disabled","false");
}

function frecciaSX(){
    if(pos != 0)
    {
        pos--;
        aggiornaPagina(date);
    }
    else
        document.getElementById("frecciaSX").disabled = true;
    document.getElementById("frecciaDX").disabled = false;
}


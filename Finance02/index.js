$(document).ready(function () {
    let _symbol=$("#_symbol");
    let _search=$("#txtSearch");
    
    _symbol.prop("selectedIndex","-1");
    _search.prop("value","");
    _symbol.on("change", function(){
        getGlobalQuotes(this.value)
    });
    _search.on("keyup", function(){
        if(_search.prop("value").length>1){
            getSymbolSearch(this.value);
        }
    });

function getGlobalQuotes(symbol) {
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=LN8NL8FN2L8Z48BK";
    $.getJSON(url,
        function (data) {
            let globalQuoteData = data["Global Quote"];
            tableHeadFill(globalQuoteData);
            $(".rowr").remove();
            let _tr=$("<tr>").addClass("rowr").appendTo($("#tab"));
            $("<td>").text(data["Global Quote"]["01. symbol"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["08. previous close"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["02. open"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["05. price"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["07. latest trading day"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["09. change"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["04. low"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["03. high"]).appendTo(_tr);;
            $("<td>").text(globalQuoteData["06. volume"]).appendTo(_tr);;
        }
    );
}

function getSymbolSearch(keywords){
   let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keywords + "&apikey=LN8NL8FN2L8Z48BK";
    try {
        $.getJSON(url,
            function (data) {
                let bestMatchesData = data["bestMatches"];
                tableHeadFill(bestMatchesData[0]);
                $(".rowr").remove();
                for(let i=0; i<bestMatchesData.length; i++){
                    let _tr=$("<tr>").addClass("rowr").appendTo($("#tab"));
                    $("<td>").text(bestMatchesData[i]["1. symbol"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["2. name"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["3. type"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["4. region"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["5. marketOpen"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["6. marketClose"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["7. timezone"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["8. currency"]).appendTo(_tr);
                    $("<td>").text(bestMatchesData[i]["9. matchScore"]).appendTo(_tr);
                }
            }
        )  
    }
    catch {
        alert("Numero massimo di richieste al minuto raggiunte");
    }
}



function tableHeadFill(array){
    $(".cap").remove();
    let head=Object.keys(array);
    for(let i=0; i<head.length;i++){
        $("<th>").addClass("cap").text(head[i].substr(3)).appendTo($("#head"))
    }
}
})


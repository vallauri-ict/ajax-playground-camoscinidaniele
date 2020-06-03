$(document).ready(function () {
    let _symbol=$("#_symbol");
    let _search=$("#txtSearch");
    let _comboChart=$("#comboChart");
    let myChart;
    let _btnDownload;
    let _btnDrive=null;
    let _chartCont=$("#chartContainer");
    let ctx = document.getElementById('myChart').getContext('2d');
    
    _symbol.prop("selectedIndex","-1");
    _comboChart.prop("selectedIndex","2");
    _search.prop("value","");
    _symbol.on("change", function(){
        getGlobalQuotes(this.value)
    });
    _search.on("keyup", function(){
        if(_search.prop("value").length>1){
            getSymbolSearch(this.value);
        }
    });
    _comboChart.on("change",function(){
        chartGenerator(this.value);
    })

    $.getJSON("https://www.alphavantage.co/query?function=SECTOR&apikey=LN8NL8FN2L8Z48BK", function (data) {
       for(let key in data){
           if(key!="Meta Data")
            $("<option>").text(key).prop("value",key).appendTo(_comboChart);
       }
    })

function getGlobalQuotes(symbol) {
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=LN8NL8FN2L8Z48BK";
    $.getJSON(url,
        function (data) {
            let globalQuoteData = data["Global Quote"];
            tableHeadFill(globalQuoteData);
            $(".rowr").remove();
            let _tr=$("<tr>").addClass("rowr").appendTo($("#tab"));
            for(let key in globalQuoteData){
                $("<td>").text(data["Global Quote"][key]).appendTo(_tr);
            }
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
                    for(let key in bestMatchesData[i]){
                        $("<td>").text(bestMatchesData[i][key]).appendTo(_tr);
                    }
                }
            })
    }
    catch {
        alert("Numero massimo di richieste al minuto raggiunte");
    }
}

function chartGenerator(choice){
    if(_btnDownload==null){
        _btnDownload=$("<a>").prop({download:"ChartImage.jpg",class:"btn btn-primary float-right bg-flat-color-1"}).appendTo(_chartCont);
        $("<i>").addClass("fa fa-download").appendTo(_btnDownload);
        _btnDrive=$("<a>").prop({class:"btn btn-primary float-right bg-flat-color-1"}).css({marginLeft:"70px!important;"}).appendTo(_chartCont);
        $("<i>").addClass("fab fa-google-drive").appendTo(_btnDrive).on("click",uploadDrive);
    }
    if(myChart!=null){
        myChart.destroy();
    }
    $.getJSON("http://localhost:3000/sector",function(dataSectors){
        let dataChart_=inviaRichiesta("GET","http://localhost:3000/chart",{},false);
        dataChart_.done(function(dataChart){
            dataChart["data"]["labels"]=[];
            dataChart["data"]["datasets"]["data"]=[];
            let i=0;
            dataChart["data"]["datasets"][0]["label"]="Valori percentuali";   
            for(let key in dataSectors[choice]){
                dataChart["data"]["labels"][i]=key;
                dataChart["data"]["datasets"][0]["data"][i]=dataSectors[choice][key].substring(0,dataSectors[choice][key].length-2);
                if(dataChart["data"]["datasets"][0]["data"][i]>0){
                    dataChart["data"]["datasets"][0]["backgroundColor"][i]="rgba(0,255,0,0.5)";
                    dataChart["data"]["datasets"][0]["borderColor"][i]="rgb(0,255,0)";
                }
                else{
                    dataChart["data"]["datasets"][0]["backgroundColor"][i]="rgba(255,0,0,0.5)";
                    dataChart["data"]["datasets"][0]["borderColor"][i]="rgb(255,0,0)";
                }
                i++;
            }
            myChart = new Chart(ctx, dataChart);
            setTimeout(download,200);
        })
        
        })
}

function tableHeadFill(array){
    $(".cap").remove();
    let head=Object.keys(array);
    for(let i=0; i<head.length;i++){
        $("<th>").addClass("cap").text(head[i].substr(3)).appendTo($("#head"))
    }
}

function download(){
    _btnDownload.prop("href",myChart.toBase64Image());
}

function inviaRichiesta(method, url, parameters = "", async = true) {
    return $.ajax({ //PROMISE PER RICHESTA AJAX
        type: method,
        url: url,
        data: parameters,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
        timeout: 5000,
        async: async
    });
}
})


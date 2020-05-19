# Finance project 

Applicazione web per imparare a lavorare sulle chiamate API

--------------------------------

*Nel dettaglio:*
1. Cercare caratteristiche di un'azienda attraverso il suo 'symbol'
```javascript
function getGlobalQuotes(symbol)
```
2. Cercare azienda mediante una textbox;
```javascript
function getSymbolSearch(keywords)
```
Per risolvere il problema del limite di chiamate imposto da Alpha Vantage (5 al minuto) carico direttamente i dati che mi fornisce la API per la ricerca tramite keywords

3. Creazione grafico da dati presi da Alpha Vantage con l'utilizzo di *Chart.js*;
```javascript
function chartGenerator(choice)
```
--------------------------------

## Utilities
Per lo sviluppo di questo progetto abbiamo utilizzato:
### Json-server
utilizzato per simulare delle chiamate API visto il limite imposto da Alpha Vantage
https://www.npmjs.com/package/json-server
### http-server
utilizzato per simulare correttamente la pubblicazione reale del sito
https://nodejs.org/it/
### Chart.js
libreria di Javascript usata per la creazione dei grafici
https://www.chartjs.org/docs/latest/


>*by Camoscini Daniele, Vallauri's student*

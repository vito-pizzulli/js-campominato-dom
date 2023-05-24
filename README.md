<h1>Griglia Campo Minato</h1>
L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100. Ci saranno quindi 10 caselle per ognuna delle 10 righe. Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
<hr>
<h2>Bonus</h2>
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:<br>
<strong>con difficoltà 1 =></strong> 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;<br>
<strong>con difficoltà 2 =></strong> 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;<br>
<strong>con difficoltà 3 =></strong> 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
<hr>
<h1>Campo Minato</h1>
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.<br>
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.<br>
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.<br>
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).<br>
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
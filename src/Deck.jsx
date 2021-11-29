import React from "react";
import Cards from "./Cards";

import { useEffect, useState } from "react";

const Deck = () => {
  const [data, setData] = useState([]);
  const [selectCard, setSelectCard] = useState([]);
  const [match,setMatch]=useState([]);
  
  //hämta hela kortleken från url
 
  useEffect(() => {
    api(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH,AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH,"
    );
  }, []);

  //hämta och omvandla till jav script kod
  async function api(url) {
    const res = await fetch(url);
    const deck = await res.json();
    const res2 = await fetch(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=24`
    );
    const data = await res2.json();
    console.log(data);
    setData(data.cards);
  }
  //om selectcard är större än 1 så ställs om den till noll
  //om första kortet och andra korete är samma så nollställs den
  //nollställning går fortare
  useEffect(()=>{
   if(selectCard.length>2){
     setSelectCard([]);
   }
   else if(selectCard.length>1 && selectCard[0]===selectCard[1]){
      selectCard.length=0;
   }
  },[selectCard])
  //om det finns mer än två kort, då jämföra första och andra kortet med hjälp av index i selected card
  //om första kortet och andra kortet är lika så pusha i match array
   useEffect(()=>{
     if(selectCard.length>1)
     if(data[selectCard[0]].code===data[selectCard[1]].code){
      match.push(data[selectCard[0]].code,data[selectCard[1]].code)
    }
  },[selectCard]);
   console.log(match);
  
  //skapa funktion som spara index i selected card
  const id=(index)=>{
  setSelectCard(()=>[...selectCard,index]);
  console.log(selectCard)
  }

  //selectcard om den innehåller index så är det sant annars är den falsk
  //onclick varje gång du clicka så logga man indexen i selectcard
  //select kolla om det finns index i selectcard
  //key ger kortet en index
  return (
    <div>
      <h1>Memory Game</h1>
      {data?.map((card, index) => (
        <Cards
          onClick={()=>id(index)}
          select={selectCard.includes(index) || match.includes(card.code)}
          src={card.image} 
          alt="" 
          key={index}>

        </Cards>
      ))}
    </div>
  );
};

export default Deck;

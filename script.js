const base_url="https://v6.exchangerate-api.com/v6/56aee11f21a25d6b6e4c9ec8/pair";
const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let finalMsg=document.querySelector(".msg");
window.addEventListener("load",()=>{
    getExchangeRate();
})
for(let select of dropdowns){
    for(currencyCode in countryList ){
       let newOption=document.createElement("option");
       newOption.innerText=currencyCode;
       newOption.value=currencyCode;
       if(select.name==="from" && currencyCode==="USD"){
        newOption.selected="selected";
       }
       else if(select.name==="to" && currencyCode==="PKR"){
        newOption.selected="selected";
       }
       select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);// This property references the element that triggered the event.
    })
}

function updateFlag(element){
let currCode=element.value;
let countryCode=countryList[currCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
// let img=element.previousElementSibling;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
}
button.addEventListener("click", (evt)=>{
    evt.preventDefault();
    getExchangeRate();
})
  
async function getExchangeRate(){
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue<1 || amountValue===""){
        amountValue=1;
        amount.value="1";
    }
let newUrl=`${base_url}/${fromCurr.value}/${toCurr.value}`;
let response=await fetch(newUrl);
let data=await response.json();
let conversionRate=data.conversion_rate;
console.log(conversionRate);
let finalAmount=amountValue*conversionRate;
console.log(finalAmount);
finalMsg.innerText=`${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
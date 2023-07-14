import { wordsList } from "./words";

const getAplha = () =>{
    const arr = [];
    for (let i = 65; i <= 90; i++) {
    arr.push(String.fromCharCode(i));
    }
    return arr;
}
export const alphabets = getAplha();
const words = wordsList;
export const getWord = ()=>{
    return words[Math.floor((Math.random()*words.length))].toUpperCase();
}
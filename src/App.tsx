import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

let ID_COUNT = 0;

interface Quote {
  id: number,
  content: string,
  author: string
}

function App() {
  const [count, setCount] = useState(0)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [author, setAuthor] = useState("")


  async function getQuotes(){
    if (author == "") return;
    
    let newQuotes: Quote[] = []

    for (let i = 0;  i < 10 ; i++){
      newQuotes.push(await getQuote())
    }
    setQuotes(newQuotes)
    
  }

  async function getQuote(){
    const result = await fetch("https://api.quotable.io/random");
    const data = await result.json();
    console.log(await data);
    const quote: Quote = {
      id: ID_COUNT++,
      content: data.content,
      author: data.author
    } 
    return quote
  }

  async function getSingleRandoQuote(){
    const result = await fetch("https://api.quotable.io/random");
    const data = await result.json();
    console.log(await data);
    const quote: Quote = {
      id: ID_COUNT++,
      content: data.content,
      author: data.author
    } 
    setQuotes([quote])
  }

  if (quotes.length == 0){
    getSingleRandoQuote()
  }

  return (
    <div className="App">
      <h1>Quote Search</h1>
      <div className="card">
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
        <button onClick={getQuotes}>GO</button>
      </div>
      <div>
        {
          
          quotes.map((quote) => (
            <div key={quote.id}>
              <p>"{quote.content}"</p>
              <p>-{quote.author}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App

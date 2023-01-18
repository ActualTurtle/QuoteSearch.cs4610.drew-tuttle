import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// async function GetQuote(){
//   // const result = await fetch("https://api.quotable.io/random");
//   // console.log(await result.json());
//   let quote = "";
//   // return await result.json();
//   // console.log("TEST")
//   return (
//     <div>{quote}</div>
//   );
// }
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
    
    const result = await fetch("https://api.quotable.io/random");
    const data = await result.json();
    const quote: Quote = {
      id: ID_COUNT++,
      content: data.content,
      author: data.author
    } 
    setQuotes([...quotes, quote])
  }
  return (
    <div className="App">
      <h1>Quote Search</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          Bees is {count}
        </button> */}
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)}/>
        <button onClick={getQuotes}>
          GO
        </button>
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

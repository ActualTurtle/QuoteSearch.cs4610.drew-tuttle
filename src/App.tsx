import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

let ID_COUNT = 0;

interface Quote {
  id: number,
  content: string,
  author: string
}

function App() {
  const [count, setCount] = useState(0);
  const [initialQuoteLoaded, setInitialQuoteLoaded] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (quotes.length === 0 && !initialQuoteLoaded){
        setInitialQuoteLoaded(true);
        getSingleRandoQuote();
    }
  }, [quotes, initialQuoteLoaded])

  async function getQuotes(){
    if (author == "") return;
    
    const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${author}`);
    const data = await result.json();
    const quote_list = await data.results;
    console.log(await data);
    console.log(author)
    let newQuotes: Quote[] = []

    for (let i = 0;  i < 10 ; i++){
      const quote: Quote = {
        id: ID_COUNT++,
        content: quote_list[i].content,
        author: quote_list[i].author
      } 
      newQuotes.push(quote)
    }
    setQuotes(newQuotes)
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

  return (
    <div className="App">
      <h1>Quote Search</h1>
      <div className="">
        <input type="text" placeholder="Search by Author" value={author} onChange={e => setAuthor(e.target.value)}/>
        <button onClick={getQuotes}>GO</button>
      </div>
      <div>
        {
          
          quotes.map((quote) => (
            <div className='quote' key={quote.id}>
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

import './App.css'
import Header from './header'
import './assets/styles/home.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

function App() {
 
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const cardapioSection = useRef(null)
  const containerDataRef = useRef(null)

  const scrollToCardapio = () => {
 
    if(cardapioSection.current) {

      cardapioSection.current.scrollIntoView({behavior: 'smooth'})

    }

  }

  const handleScroll = () => {

    const cardapioTop = cardapioSection.current.getBoundingClientRect().top 
    const windowHeight = window.innerHeight

    if(cardapioTop <= windowHeight * 0.75) {

      containerDataRef.current.classList.add('visible')
      window.removeEventListener('scroll',handleScroll)
    } 

  }

  useEffect(() => {

    window.addEventListener('scroll',handleScroll)
    return() => {

      window.removeEventListener('scroll',handleScroll)

    }

  },[])

  useEffect(() => {

    axios.get('http://localhost:5000/pizzas')
    .then(response => {

      setData(response.data)

    })

    .catch(error => {

      setError(error,'Error fetching Data')

    })

  }, [])
  
  return (
    <>
      
      <Header></Header>

      <section className='landing'>

        <div className='containerButton'>

        <div>
        <h1 className='titleStyle'>Bem vindo a Pizzaroot</h1>
        <p className='pTitle'>Saborosas pizzas feitas pra você</p>
        </div>
       
        <button onClick={scrollToCardapio} type="button" className="buttonStyle focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Ver Cardápio</button>
            
        </div>

      </section>

      <section ref={cardapioSection} id='cardapio' className='container2Style'>

    <div>

    
    <div>
    <h1 className='title2Style'>Cardápio</h1>
    </div>
    
    <div ref={containerDataRef} className='containerData'>

    
      {data && data.map(pizzas => (
 <div className='containerData1' key={pizzas._id}>
        

          <img className='imgData' src={pizzas.url} alt="" />

          <div className='containerItems'>
          <h1 className='titlePizzas'>{pizzas.name} - </h1>  <h1 className='titlePizzas'>Preço {pizzas.price}</h1>
          </div>
          </div>
       

      ))}
</div>

      </div>

      
      </section>

    </>
  )
}

export default App

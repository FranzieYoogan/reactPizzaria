import './assets/styles/contato.css'

function Contato() {

    return(

        <>

            <section id='contato' className="containerContato">

                <div>

                <h1 className='titleContato'>Contato</h1>
                <p className='pContato'>Entre em contato conosco para fazer pedidos ou tirar dúvidas.</p>

                </div>

            </section>

            <section className='containerItemsContato'>

          

            
            <div className='containerSpanContato'>
                <span className='spanContatoStyle'>Endereço: </span> <p>Avendida BibidiBabidiBoo nº 123 centro, Cidade Magika/Rj CEP: 1234</p>
            </div>

            <div className='containerSpanContato'>

                <div>

                <div className='containerSpanContato2'>
                <span className='spanContatoStyle'>Telefone: </span> <p>(21)1234-5678</p>
                </div>
               

                <div className='containerSpanContato2'>
                <span className='spanContatoStyle'>E-mail</span> <p>contato@pizzaroot.pizza</p>
                </div>

                </div>


            </div>


            <div>

                <span className='spanContatoStyle'>Horário de Funcionamento:</span>
                <p>Segunda a Sábado: 11h00 às 23h00 - Domingo: 16h00 às 23h00</p>

            </div>


            </section>

        </>

    )

}

export default Contato
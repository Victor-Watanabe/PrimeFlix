import api from '../../services/api';
import { useEffect, useState } from 'react';
import './home.css'
import { Link } from 'react-router-dom'; 

function Home(){
    const [filmes, setfilmes] = useState([]);
    const [loading, setloading] = useState(true);
 
    useEffect(()=>{

        async function loadingFilmes() {
            const response = await api.get("movie/now_playing", 
                {params:{
                    api_key: "bb733893375ffd0a362d0d23c5dfc8fd",
                    language: "pt-BR",
                    page: 1,
            }
        })

        setfilmes(response.data.results.slice(0,10));
        setloading(false);
        
        }
        loadingFilmes();
   
    },[])

    if(loading){
        return(
            <div className='loading'>
             <h2>Carregando Filmes...</h2>
            </div> 
        );
    }

    return(
        <div className='container'>
            <div className='lista_filmes'>
                {filmes.map((filme)=>{ return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt='filme.title'/>
                        <Link to={`/filme/${filme.id}`}>Acessar!</Link>
                    </article>
                )
                 })}
            </div>
        </div>
    );
}

export default Home;
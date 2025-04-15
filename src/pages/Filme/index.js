import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import "./filme.css";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setloading] = useState(true); 

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "bb733893375ffd0a362d0d23c5dfc8fd",
                    language: "pt-BR", 
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setloading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO!");
                navigate("/",{ replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado")
        }
    },[navigate, id])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        );
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avalição: {filme.vote_average} /10</strong>
        
            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
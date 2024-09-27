import React, {useEffect} from 'react';
import {useParams} from "react-router";

function DetalhesHotel(props) {
    const {id} = useParams()

    const [hotel, setHotel] = React.useState({})

    useEffect(() => {
        const conteudo = JSON.parse(localStorage.getItem("hoteis") || [])
        setHotel(conteudo.find(hotel => hotel.id === Number(id)));
    }, []);

    return (
        <div>
            <h2>{hotel.nome}</h2>
            {hotel.imagens?.map((imagem, indexImagem) => (
                <img src={imagem} width={500} alt={`imagem ${indexImagem}`}/>
            ))}
            <p>{hotel.descricao}</p>
        </div>
    );
}

export default DetalhesHotel;

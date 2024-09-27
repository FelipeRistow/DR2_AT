import React from 'react';
import "./styles.css";
import {Link} from "react-router-dom";

function CardHotel(props) {
    const {imagens, nome, descricao, cidade, estado, id} = props.hotel
    return (
        <div className={"CardHotel"}>
            <img src={imagens[0]} alt={`Imagem Hotel ${nome}`}/>
            <Link to={`hoteis/${id}/`}><h3>{nome}</h3></Link>
            <h4>{cidade} - {estado}</h4>
            <p>{descricao}</p>
        </div>
    );
}

export default CardHotel;
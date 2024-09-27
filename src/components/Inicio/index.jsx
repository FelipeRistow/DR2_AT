import React, {useEffect, useState} from 'react';
import CardHotel from "../CardHotel";
import "./styles.css";

function Inicio(props) {
    const [hoteis, setHoteis] = useState([]);

    useEffect(() => {
        const conteudo = localStorage.getItem('hoteis') || "[]"
        setHoteis(JSON.parse(conteudo));
    }, []);

    return (
        <div className={"Inicio"}>
            <div className={"InicioConteudo"}>
                {hoteis.map((hotel, hotelIndex) => (
                    <CardHotel hotel={hotel} key={hotelIndex}/>
                ))}
            </div>
        </div>
    );
}

export default Inicio;
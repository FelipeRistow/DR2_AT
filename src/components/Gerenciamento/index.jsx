import React, {useEffect, useRef, useState} from 'react';
import "./styles.css";
import {IoCloseCircle} from "react-icons/io5";
import {RiDeleteBin2Fill, RiDeleteBin2Line, RiEdit2Fill} from "react-icons/ri";

function Gerenciamento(props) {

    const [hoteis, setHoteis] = useState([]);
    const [adicionandoHotel, setAdicionandoHotel] = useState(false);
    const [imagensAdicionadas, setImagensAdicionadas] = useState([]);
    const [excluindoHotel, setExcluindoHotel] = useState(false);

    const nomeHotelRef = useRef(null);
    const cidadeHotelRef = useRef(null);
    const estadoHotelRef = useRef(null);
    const descricaoHotelRef = useRef(null);

    useEffect(() => {
        const conteudo = localStorage.getItem('hoteis') || "[]"
        console.log("CONTEUDO EH", conteudo)
        setHoteis(JSON.parse(conteudo));
    }, []);

    const addHotel = (e) => {
        e.preventDefault();

        const hotel = {
            nome: nomeHotelRef.current.value,
            cidade: cidadeHotelRef.current.value,
            estado: estadoHotelRef.current.value,
            descricao: descricaoHotelRef.current.value,
            imagens: imagensAdicionadas,
            id: hoteis.length === 0 ? 0 : Math.max(...(hoteis.map(hotel => hotel.id))) + 1
        }

        const novosHoteis = [...hoteis, hotel]
        localStorage.setItem("hoteis", JSON.stringify(novosHoteis))
        setHoteis(novosHoteis)
        setAdicionandoHotel(false)
    }

    const addImagem = (e) => {
        e.preventDefault()
        if (imagensAdicionadas.length > 4) {
            return alert("Só é possível adicionar até 5 imagens")
        }
        setImagensAdicionadas([...imagensAdicionadas, ""])
    }

    const removerImagem = (index) => {
        const novasImagensAdicionadas = [...imagensAdicionadas]
        novasImagensAdicionadas.splice(index, 1)
        setImagensAdicionadas(novasImagensAdicionadas)
    }

    const imagemAlterada = (index, texto) => {
        const novasImagensAdicionadas = [...imagensAdicionadas]
        novasImagensAdicionadas[index] = texto
        setImagensAdicionadas(novasImagensAdicionadas)
    }

    const excluirHotel = (index) => {
        setExcluindoHotel(index)
    }

    const confirmarExcluirHotel = () => {
        const novosHoteis = [...hoteis]
        novosHoteis.splice(excluindoHotel, 1)
        localStorage.setItem("hoteis", JSON.stringify(novosHoteis))
        setHoteis(novosHoteis)
        setExcluindoHotel(false)
    }

    return (
        <div>
            <button onClick={() => setAdicionandoHotel(true)}>Adicionar Hotel</button>
            <ul>
                {hoteis.map((hotel, hotelIndex) => {
                    return <li>
                        <span>{hotelIndex + 1} - {hotel.nome} - {hotel.cidade} - {hotel.estado}</span>
                        <RiEdit2Fill size={20} color={"green"}/>
                        <RiDeleteBin2Fill size={20} color={"red"} onClick={() => excluirHotel(hotelIndex)}/>
                    </li>
                })}
            </ul>
            { excluindoHotel !== false && <div className={"AddHotelModalContainer"}>
                <div className={"AddHotelModal"}>
                    <h3>TEM CERTEZA QUE DESEJA EXCLUIR O HOTEL {hoteis[excluindoHotel].nome} ?</h3>
                    <button onClick={confirmarExcluirHotel}>Sim</button>
                    <button onClick={() => setExcluindoHotel(false)}>Não</button>
                </div>
            </div>}
            { adicionandoHotel && <div className={"AddHotelModalContainer"}>
                <div className={"AddHotelModal"}>
                    <form onSubmit={addHotel}>
                        <label>Nome</label>
                        <input ref={nomeHotelRef} name={"nome"} id={"add-hotel-nome"} type={"text"}/>
                        <label>Cidade</label>
                        <input ref={cidadeHotelRef} name={"cidade"} id={"add-hotel-cidade"} type={"text"}/>
                        <label>Estado</label>
                        <input ref={estadoHotelRef} name={"estado"} id={"add-hotel-estado"} type={"text"}/>
                        <label>Descrição</label>
                        <textarea ref={descricaoHotelRef} name={"descricao"} id={"add-hotel-descricao"}/>
                        <label>Imagens (urls)</label>
                        {
                            imagensAdicionadas.map((imagem, indexImagem) => (
                                <div className={"AddHotelImagem"}>
                                    <input
                                        type={"text"}
                                        key={indexImagem}
                                        name={`imagem ${indexImagem}`}
                                        value={imagem}
                                        onChange={(e) => imagemAlterada(indexImagem, e.target.value)}
                                    />
                                    <IoCloseCircle
                                        onClick={() => removerImagem(indexImagem)}
                                        size={25}
                                    />
                                </div>
                            ))
                        }
                        <button onClick={addImagem}>Adicionar Imagem</button>
                        <input type={"submit"} value={"Salvar"}/>
                    </form>
                </div>
            </div>}
        </div>
    );
}

export default Gerenciamento;
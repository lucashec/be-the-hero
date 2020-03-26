import React, {useState} from 'react';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import LogoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

export default function NewIncident(){
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value,
        };
        try{
            await api.post('/incidents',data,{
                headers:{
                    Authorization: ongId,
                }
            })
            alert('Caso Cadastrado');
          history.push('/profile'); 

        }catch(err){
            alert('Erro ao cadastrar o caso, tente novamente.');
        }
    }

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={LogoImg} alt="Be The Hero"/>

                <h1>Cadastro novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size= {15} color="#e02041" />
                    Voltar para home
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Título do caso"
                value={title}
                onChange = {e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição"
                value={description}
                onChange = {e => setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em reias"
                value={value}
                onChange = {e => setValue(e.target.value)}
                />

                <button className="button" oncl type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    )
}
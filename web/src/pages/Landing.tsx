import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';


export default function Landing(){
    return (
        <div id="page-landing">
        <div className="content-wraper">
            <img className="logo" src={logoImg} alt="Happy"/>
            <div className="location">
                <strong>Guarulhos</strong>
                <span>São Paulo</span>
            </div>
            
            <main>
            <h1>Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>

            

            <Link to="/app" className="enter-app">  
                <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/> 
            </Link>
        </div>
        </div>
    );
}

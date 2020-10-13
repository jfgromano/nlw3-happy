import React from 'react';
import { Link } from 'react-router-dom';
import{Map, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanagesMap.css';
import mapMarkerImg from '../images/map-marker.svg'
import {FiPlus} from 'react-icons/fi'

export default function OrphanagesMap(){
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Guarulhos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            <div>

            </div>

            <Map center={[-23.4572765,-46.5644216]} zoom={15} style={{width: '100%', height: '100%'}}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/orphanage.css';
import SideBar from "../components/Sidebar";
import happyMapIcon from '../utils/mapIcon';
import { useParams } from "react-router-dom";
import api from "../services/api";

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string
  }>
}

interface RouteParams {
  id: string;

}

export default function Orphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const params = useParams<RouteParams>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    })
  }, [params.id]);

  if (typeof orphanage === 'undefined') {
    return (<p>Carregando...</p>);
  }

  let classFinalSemana = "open-on-weekends";
  let textFinalSemana = `Atendemos`;
  let corFinalSemana = '#37C77F';

  if (orphanage.open_on_weekends === false) {
    classFinalSemana += ' dont-open';
    textFinalSemana = 'Não Atendemos';
    corFinalSemana = '#FF669D';
  }

  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          
        <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />
          <div className="images">
            {
              orphanage.images.map((image, index) => {
                console.log(image);
                return (
                  <button key={image.id} className={index === activeImageIndex ? 'active' : ''} type="button" onClick={ () => {
                    setActiveImageIndex(index);
                  }}>
                    <img src={image.url} alt={orphanage.name} />
                  </button>
                );
              })
            }
          </div>
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>

              <div className={classFinalSemana}>
                <FiInfo size={32} color={corFinalSemana} />
                {textFinalSemana}
                <br/>
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
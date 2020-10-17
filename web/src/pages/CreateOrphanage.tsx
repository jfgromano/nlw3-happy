import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { FiPlus, FiX } from "react-icons/fi";

import { useHistory } from 'react-router-dom';

import '../styles/pages/create-orphanage.css';
import happyMapIcon from '../utils/mapIcon';

import SideBar from "../components/Sidebar";
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openWeekends, setOpenWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;


    const params = new FormData();
    params.append('name', name);
    params.append('about', about);
    params.append('latitude', String(latitude));
    params.append('longitude', String(longitude));
    params.append('instructions', instructions);
    params.append('opening_hours', openingHours);
    params.append('open_on_weekends', String(openWeekends));
    
    images.forEach(image => {
      params.append('images', image);
    })

    await api.post('orphanages', params);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }

  function renderImages(images: File[]){
    setImages(images);
    const selectedImagesPreview = images.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    const imageFiles = event.target.files;
    if (!imageFiles) {
      return;
    }
    const selectedImages = Array.from(imageFiles)
    renderImages(selectedImages);
  }

  function handleRemoveImage(index: number){
    images.splice(index, 1)
    renderImages(images);
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.4466279, -46.5597325]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                onChange={(event) => setAbout(event.target.value)}
                value={about} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image} className="image-div">
                      <img src={image} alt={name}>

                      </img>
                      <label onClick={(event) => handleRemoveImage(index)} className="remove-image">
                        <FiX size={24} color="#FF669D" />
                      </label>
                    </div>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input onChange={handleSelectedImages} multiple type="file" name="image[]" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                onChange={(event) => setInstructions(event.target.value)}
                value={instructions} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={(event) => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button onClick={(event) => setOpenWeekends(true)} type="button" className={openWeekends ? "active" : ''} >Sim</button>
                <button onClick={(event) => setOpenWeekends(false)} type="button" className={openWeekends === false ? "active" : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
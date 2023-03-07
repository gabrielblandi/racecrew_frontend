import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import carIcon from "../../images/car-icon.png";
import localizationIcon from '../../images/localizationIcon.png';

function Map({ positions, userLocation }) {
  const [wazeOpened, setWazeOpened] = useState(false);

  useEffect(() => {
    // Define a função para fechar a janela do Waze
    window.addEventListener("message", (event) => {
      if (event.origin !== "https://embed.waze.com") {
        return;
      }

      if (event.data === "close") {
        setWazeOpened(false);
      }
    });
  }, []);

  const defaultPosition = [-23.6, -46.5];

  // Define o ícone do marcador
  const outros = L.icon({
    iconUrl: carIcon,
    iconSize: [40, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const voce = L.icon({
    iconUrl: localizationIcon,
    iconSize: [40, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const openWaze = (latitude, longitude) => {
    const url = `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    window.open(url, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
    setWazeOpened(true);
  };

  const handleMapReady = (map) => {
    if (userLocation) {
      map.setView(userLocation, 16);
    }
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={16}
      style={{ height: "100vh", width: "100vw" }}
      whenReady={handleMapReady}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {positions.map((position, index) => (
        <Marker
          key={index}
          position={[position.latitude, position.longitude]}
          icon={outros}
        >
          <Popup>{position.name}

            <br />
            <br />
            <div className='wazeButton' onClick={() => {
              if (userLocation && position.latitude !== userLocation[0] && position.longitude !== userLocation[1]) {
                openWaze(position.latitude, position.longitude);
              }
            }}>Abrir com Waze</div>
            <br />
            <a href={"tel:" + position.tel} className='telephoneButton'>Ligar para telefone</a>
            <br/><br/>
            
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={userLocation} icon={voce}>
          <Popup>Sua Localização</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
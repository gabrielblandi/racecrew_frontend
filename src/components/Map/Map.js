import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from 'react-leaflet/hooks'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import carIcon from "../../images/car-icon.png";
import localizationIcon from '../../images/localizationIcon.png';
import featuredMarker from '../../images/featuredmark.png';
import customMarker from '../../images/custommark.png';

function Map({ positions, userLocation, FeaturedMarkers, customMarkers }) {
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

  const outros = L.icon({
    iconUrl: carIcon,
    iconSize: [40, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const featuredMarks = L.icon({
    iconUrl: featuredMarker,
    iconSize: [40, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const customMarks = L.icon({
    iconUrl: customMarker,
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

  function ChangeView(props) {
    const map = useMap()
    if (userLocation) {
      map.setView(props.newLocation, Number(props.zoom));
    }
    return null
  }

  return (
    <MapContainer
      center={defaultPosition}
      zoom={16}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {customMarkers.map((customMark, index) => (
        <Marker
          key={index}
          position={[customMark.latitude, customMark.longitude]}
          icon={customMarks}
        >
          <Popup>{customMark.name}

            <br />
            <br />
            <div className='wazeButton' onClick={() => {
              if (userLocation && customMark.latitude !== userLocation[0] && customMark.longitude !== userLocation[1]) {
                openWaze(customMark.latitude, customMark.longitude);
              }
            }}>Abrir com Waze</div>
            <br />

          </Popup>
        </Marker>
      ))}
      
      {FeaturedMarkers.map((featuredMark, index) => (
        <Marker
          key={index}
          position={[featuredMark.latitude, featuredMark.longitude]}
          icon={featuredMarks}
        >
          <Popup>{featuredMark.name}

            <br />
            <br />
            <div className='wazeButton' onClick={() => {
              if (userLocation && featuredMark.latitude !== userLocation[0] && featuredMark.longitude !== userLocation[1]) {
                openWaze(featuredMark.latitude, featuredMark.longitude);
              }
            }}>Abrir com Waze</div>
            <br />
            <a href={"tel:" + featuredMark.tel} className='telephoneButton'>Ligar para telefone</a>
            <br /><br />
            <a href={featuredMark.link} target="_blank" className='websiteButton' color='white'>&nbsp; Acessar Website &nbsp;</a>
            <br /><br />

          </Popup>
        </Marker>
      ))}

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
            <br /><br />

          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={userLocation} icon={voce}>
          <Popup>Sua Localização</Popup>
        </Marker>
      )}

      {userLocation && (<ChangeView newLocation={userLocation} zoom={12} />)}
    </MapContainer>
  );
}

export default Map;
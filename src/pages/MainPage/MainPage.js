import React, { useState, useEffect } from 'react';
import Logo_white from '../../images/racecrew_logo_white.png';
import './MainPage.css';
import Map from '../../components/Map/Map';
import MaterialIcon from 'material-icons-react';

export default function MainPage() {
    const [userLocation, setUserLocation] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSendInviteClick = () => {
        setShowPopup(true);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            error => {
                console.log(error);
                fetch('https://ipapi.co/json/')
                    .then(response => response.json())
                    .then(data => {
                        const { latitude, longitude } = data;
                        setUserLocation([latitude, longitude]);
                    })
                    .catch(error => {
                        console.log(error);
                        setUserLocation([-22.6, -45.5]);
                    });
            },
            { enableHighAccuracy: true }
        );
    }, []);

    const positions = [
        { name: 'Membro 1', latitude: -23.551148, longitude: -46.634129, tel: '11940120606' },
        { name: 'Membro 2', latitude: -22.551148, longitude: -46.634129, tel: '11960665430' },
        { name: 'Membro 3', latitude: -20.551148, longitude: -43.634129, tel: '11988222262' }
    ];

    return (
        <div>
            <nav className='black white-text'>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo center"><div className='logotipoNavbar fade-in'><img src={Logo_white} ></img></div></a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        &nbsp;
                    </ul>
                </div>
            </nav>

            <ul>
                {
                    positions && positions?.map((position) => {
                        return <li className='listaMembrosGrupo'><div className='memberName'>{position.name}</div></li>
                    })
                }
            </ul>
            <Map positions={positions} userLocation={userLocation} />
            <div className='fade-in manageGroupButton waves waves-effect waves-light'><MaterialIcon icon="group" color='white' /></div>
            <div className='fade-in manageChatButton waves waves-effect waves-light'><MaterialIcon icon="chat" color='white' /></div>
            <div className='fade-in removeLocalizationButton waves waves-effect waves-light'><MaterialIcon icon="gps_off" color='white' /></div>
            <div className='fade-in sendInviteButton waves waves-effect waves-light' onClick={handleSendInviteClick}>
                <MaterialIcon icon="insert_link" color='white' />
            </div>
            {showPopup && (
                <div className="popup fade-in">
                    <div className="popup-content">
                        <h5>Código de convite</h5>
                        <input type="text" value="FDN74KLK" />
                        <button onClick={() => navigator.clipboard.writeText("FDN74KLK")}>
                            <MaterialIcon icon="content_copy" />
                        </button>
                        <button className='closemodalButton' onClick={() => setShowPopup(false)}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
}
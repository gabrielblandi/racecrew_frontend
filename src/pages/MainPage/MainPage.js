import React, { useState, useEffect } from 'react';
import Logo_white from '../../images/racecrew_logo_white.png';
import './MainPage.css';
import Map from '../../components/Map/Map';

export default function MainPage() {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            error => {
                console.log(error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    const positions = [
        { name: 'Membro 1', latitude: -23.551148, longitude: -46.634129, waze: '' },
        { name: 'Membro 2', latitude: -22.551148, longitude: -46.634129, waze: '' },
        { name: 'Membro 3', latitude: -20.551148, longitude: -43.634129, waze: '' }
    ];

    return (
        <div>
            <nav className='black white-text'>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo"><span className='logotipoNavbar fade-in'><img src={Logo_white} ></img></span></a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        {
                            positions && positions?.map((position) => {
                                return <li><a href="#">{position.name}</a></li>
                            })
                        }
                    </ul>
                </div>
            </nav>
            <Map positions={positions} userLocation={userLocation} />
        </div>
    );
}
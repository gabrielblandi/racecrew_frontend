import React, { useState, useEffect } from 'react';
import Logo_white from '../../images/racecrew_logo_white.png';
import Logo_black from '../../images/racecrew_logo_black.png';
import './MainPage.css';
import Map from '../../components/Map/Map';
import MaterialIcon from 'material-icons-react';

export default function MainPage() {
    const [userLocation, setUserLocation] = useState(null);
    const [showPopupInvite, setShowPopupInvite] = useState(false);
    const [showManageGroup, setshowManageGroup] = useState(false);

    const handleSendInviteClick = () => {
        setShowPopupInvite(true);
    };


    const handleshowManageGroup = () => {

        if(showManageGroup){
            setshowManageGroup(false);
        }else{
            setshowManageGroup(true);
        }
        
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
            <nav className='white black-text'>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo left"><div className='logotipoNavbar fade-in'><img src={Logo_black} ></img></div></a>
                    <ul id="nav-mobile" class="right show-on-medium-and-up show-on-medium-and-down">
                    <li><div className='exitButton'><MaterialIcon icon="exit_to_app" color='black' /></div></li>
                    </ul>
                </div>
            </nav>

            {showManageGroup && <ul id='membersGroup'>
                <li><div className='GroupmemberAction'>Apagar Grupo </div></li>
                {
                    positions && positions?.map((position) => {
                        return <li><div className='GroupmemberName'><MaterialIcon icon="place" color='black' /><MaterialIcon icon="delete_forever" color='red' />{position.name}</div></li>
                    })
                }
            </ul>
            }
            <Map positions={positions} userLocation={userLocation} />
            <div className='fade-in FloatRoundButton manageGroupButton waves waves-effect waves-light' onClick={handleshowManageGroup} ><MaterialIcon icon="group" color='white' /></div>
            <div className='fade-in FloatRoundButton manageChatButton waves waves-effect waves-light'><MaterialIcon icon="chat_bubble" color='white' /></div>
            <div className='fade-in FloatRoundButton removeLocalizationButton waves waves-effect waves-light'><MaterialIcon icon="gps_off" color='white' /></div>
            <div className='fade-in FloatRoundButton sendInviteButton waves waves-effect waves-light' onClick={handleSendInviteClick}>
                <MaterialIcon icon="insert_link" color='white' />
            </div>
            {showPopupInvite && (
                <div className="popup fade-in">
                    <div className="popup-content">
                        <h5>Código de convite</h5>
                        <input type="text" value="FDN74KLK" />
                        <button onClick={() => navigator.clipboard.writeText("FDN74KLK")}>
                            <MaterialIcon icon="content_copy" />
                        </button>
                        <button className='closemodalButton' onClick={() => setShowPopupInvite(false)}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
}
// import MaterialIcon from 'material-icons-react';
import React from 'react';
import Logo_black from '../../images/racecrew_logo_black.png';
import Logo_white from '../../images/racecrew_logo_white.png';
import Background_video from '../../images/background4.mp4';
import './HomePage.css';
import { encode as base64_encode, decode as base64_decode } from 'base-64';

export default class HomePage extends React.Component {
  state = {
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {

  }


  entrar = () => {

    const redirectTo = base64_encode('MainPage');

    document.location.href = "/?Instance=" + redirectTo;

  }

  render() {
    return (
      <div className="background-video">
        <div className='areaLogin fade-in'>

          <div className='row'>
            <div className='container'>
              <div className='col s12'>
              <span className='logotipo fade-in'><img src={Logo_black} ></img></span>
              </div>
              <div className='col s12'>
                <input type='text' id='username' placeholder='Usuário' name='username' className='campoPersonalizado' />
              </div>
              <div className='col s12'>
                <input type='password' id='password' placeholder='Senha' name='password' className='campoPersonalizado' />
              </div>

              <div className='col s12 left'>
              <a href='' className='forgottenPassword'>Esqueci minha senha?</a>
                <br /><br />
                <hr />
              </div>

              <div className='col s12'>
                <button class="login-button" onClick={() => {
                  this.entrar()
                }}>
                  Entrar
                </button>
              </div>
              <div className='col s12'>
                <button class="facebook-button">
                  Entrar com o Facebook
                </button>
              </div>

              <div className='col s12'>
                <button class="register-button">
                  Registrar-se
                </button>
              </div>
            </div>
          </div>
        </div>

        <video autoPlay muted loop>
          <source src={Background_video} type="video/mp4" />
        </video>
      </div>
    );
  }
}

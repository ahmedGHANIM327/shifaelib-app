import * as React from 'react';

interface ResetPasswordProps {
  email: string;
  url: string;
  password: string;
  cabinet: string;
}

/* eslint-disable-next-line @next/next/no-img-element */
export const NewUserAccount: React.FC<Readonly<ResetPasswordProps>> = ({
                                                                        email,
                                                                        url,
  password,
  cabinet
                                                                      }) => (
  <div
    style={{
      backgroundColor: '#f1f4f9',
      textAlign: 'center',
      padding: '50px 0px',
    }}
  >
    <div>
      <a href={url} target={'_blank'}>
        <img
          alt={'shifaelib'}
          src={
            'https://centrehassy.com/wp-content/uploads/2024/08/shifaelib-transparent-logo-1.png'
          }
          width={150}
          height={150}
        />
      </a>
    </div>
    <div
      style={{
        textAlign: 'justify',
        margin: '30px auto',
        paddingTop: '45px',
        paddingBottom: '15px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'white',
        marginTop: '30px',
        borderRadius: '10px',
        width: 'fit-content',
        maxWidth: '550px'
      }}
    >
      <div>
        <h1
          style={{
            marginBottom: '20px',
            fontWeight: 'bold',
            fontSize: '25px',
            textAlign: 'center'
          }}
        >
          Bienvenue chez Shifaelib !
        </h1>
      </div>
      <div>
        <p
          style={{
            marginBottom: '15px',
            fontSize: '16px',
          }}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Nous avons le plaisir de vous informer que votre compte pour vous y accèder à l'éspace {cabinet} a été
          bien crée.
        </p>
      </div>
      <div>
        <p
          style={{
            marginBottom: '15px',
            fontSize: '16px',
          }}
        >
          Vous trouverez ci-dessous vos identifiants de connexion.
        </p>
      </div>
      <div
        style={{
          marginBottom: '35px',
          fontSize: '16px',
          textAlign: 'start'
        }}
      >
        <ul>
          <li>Adresse de connexion: <a href={url} target={'_blank'}
                                       style={{
                                         color: '#4040FF',
                                         textDecoration: 'underline'
                                       }}
          >https://shifaelib.com</a></li>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <li>Nom d'utilisateur (login) : <span style={{
            fontWeight: 'bold'
          }}>{email}</span></li>
          <li>Mot de passe : <span style={{
            fontWeight: 'bold'
          }}>{password}</span></li>
        </ul>
      </div>
    </div>
    <div>
      <p
        style={{
          fontSize: '12px',
        }}
      >
        Ce message a été envoyé automatiquement par shifaelib.
      </p>
    </div>
  </div>
);

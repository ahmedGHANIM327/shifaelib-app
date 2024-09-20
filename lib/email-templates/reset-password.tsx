import * as React from 'react';

interface ResetPasswordProps {
  email: string;
  url: string;
}

/* eslint-disable-next-line @next/next/no-img-element */
export const ResetPassword: React.FC<Readonly<ResetPasswordProps>> = ({
  email,
  url,
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
        textAlign: 'center',
        margin: '30px auto',
        paddingTop: '45px',
        paddingBottom: '45px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'white',
        marginTop: '30px',
        borderRadius: '10px',
        width: 'fit-content',
      }}
    >
      <div>
        <h1
          style={{
            marginBottom: '20px',
            fontWeight: 'bold',
            fontSize: '25px',
          }}
        >
          Réinitialisation de mot de passe
        </h1>
      </div>
      <div>
        <p
          style={{
            marginBottom: '35px',
            fontSize: '16px',
          }}
        >
          Vous avez perdu votre mot de passe ou souhaitez le réinitialiser ?
          Cliquez sur le lien ci-dessous.
        </p>
      </div>
      <div>
        <a
          href={url}
          style={{
            backgroundColor: '#4040FF',
            color: '#fff',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '30px',
            paddingRight: '30px',
            borderRadius: '5px',
          }}
        >
          Réinitialiser votre mot de passe
        </a>
      </div>
    </div>
  </div>
);

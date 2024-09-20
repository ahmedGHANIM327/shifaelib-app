// prettier-ignore
export const loginErrors = {
  INVALID_CREDENTIALS:
    'L\'email ou le mot de passe est incorrect. Veuillez réessayer.',
  ACCOUNT_BLOCKED: 'Votre compte est bloqué',
  ACCOUNT_DELETED: 'Votre compte a été supprimé',
  CABINET_INACTIF:
    'Votre compte cabinet n\'est pas actif. Veuillez renouveler votre abonnement.',
  CABINET_BLOCKED:
    'Votre compte cabinet est bloqué. Veuillez nous contacter pour plus d\'informations.',
  CABINET_DELETED:
    'Votre compte cabinet a été supprimé. Veuillez nous contacter pour le réactiver.',
};

export const REQUEST_RESET_PASSWORD_SUCCESS = `Un email de réinitialisation de mot de passe a été envoyé à votre
            adresse email. Veuillez vérifier votre boîte de réception et suivre
            les instructions pour réinitialiser votre mot de passe.`;

export const RESET_PASSWORD_INVALID_TOKEN = `Le lien de réinitialisation de mot de passe que vous avez utilisé n'est plus valide. 
            Veuillez faire une nouvelle demande de réinitialisation pour recevoir un nouveau lien. Si vous avez des questions ou besoin 
            d'aide, n'hésitez pas à contacter notre support client.`;

export const RESET_PASSWORD_SUCCESS = `Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.`;
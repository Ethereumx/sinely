const NAME_MIN = 3;
const NAME_MAX = 60;
const PASSWORD_MIN = 6;
const PASSWORD_MAX = 30;

 
const NAME_MIN_ERROR = `Name length must be at least ${NAME_MIN} characters long`;
const NAME_MAX_ERROR = `Name length must be less than or equal to ${NAME_MAX} characters long`;
const PASSWORD_MAX_ERROR = `Password length must be less than or equal to ${PASSWORD_MAX} characters long`;
const PASSWORD_MIN_ERROR = `Password length must be at least ${PASSWORD_MIN} characters long`;
const USERNAME_EMAIL_ERROR = 'Email must be a valid email address';
FETCH_INFO_ERROR_MESSAGE= 'un Problème est survenu,veuillez réesayer';

module.exports = {
  NAME_MIN,
  NAME_MAX,
  PASSWORD_MAX,
  PASSWORD_MIN,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  PASSWORD_MAX_ERROR,
  PASSWORD_MIN_ERROR,
  USERNAME_EMAIL_ERROR,
  FETCH_INFO_ERROR_MESSAGE,
};

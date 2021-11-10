const NAME_MIN = 3;
const NAME_MAX = 60;
const PASSWORD_MIN = 6;
const PASSWORD_MAX = 30;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type serverd by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR
const SIGN_INFO_SUCCESS_MESSAGE=`Votre fichier a été signé avec succès`;
const USER_NOT_FOUND_ERROR_MESSAGE = `user not found`;
const FILE_NOT_FOUND_ERROR_MESSAGE=`Can't open your file`;
const SIGNATURE_ERROR_MESSAGE=`Error occured while signign your file`;
module.exports = {
  SIGN_INFO_SUCCESS_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  FILE_NOT_FOUND_ERROR_MESSAGE,
  SIGNATURE_ERROR_MESSAGE,
};

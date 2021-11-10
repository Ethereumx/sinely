const NAME_MIN = 3;
const NAME_MAX = 60;
const PASSWORD_MIN = 6;
const PASSWORD_MAX = 30;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type serverd by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR
const CHECK_INFO_SUCCESS_MESSAGE='Vérification réussite. la signature correspond à la clé fournie';
const FILE_NOT_FOUND_ERROR_MESSAGE=`Impossible d'ouvrir votre fichier`;
const CHECK_ERROR_MESSAGE=`Signature erronée`;
const UNABLE_TO_CHECK_MESSAGE = 'Désolé, nous ne pouvons pas vérifier la signature pour vous (soit le fichier n\'existe pas soit il est la signature est erronée)';
module.exports = {
  CHECK_INFO_SUCCESS_MESSAGE,
  UNABLE_TO_CHECK_MESSAGE,
  FILE_NOT_FOUND_ERROR_MESSAGE,
  CHECK_ERROR_MESSAGE,
};

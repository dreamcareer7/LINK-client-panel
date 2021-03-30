import { notify } from 'react-notify-toast';

export const TOAST_TYPE = {
  success: 'success',
  error: 'error',
  warning: 'warning',
};

export const SUCCESS_TOAST_COLOR = '#00A65A';
export const ERROR_TOAST_COLOR = '#DD4B39';
export const WARNING_TOAST_COLOR = '#F39C12';
export const TOAST_TIMEOUT = 1500;

export const successNotification = message => {
  notify.show(message, TOAST_TYPE.success, TOAST_TIMEOUT, SUCCESS_TOAST_COLOR);
};
export const errorNotification = message => {
  notify.show(message, TOAST_TYPE.error, TOAST_TIMEOUT, ERROR_TOAST_COLOR);
};

export const warningNotification = message => {
  notify.show(message, TOAST_TYPE.warning, TOAST_TIMEOUT, WARNING_TOAST_COLOR);
};

export const replaceHiddenCharacters = string => {
  return string.toString().replace(/[\u200c\u200b]/g, '');
};

export const checkForEmail = emailAddress => {
  return /.+@.+\.[A-Za-z]+$/.test(emailAddress);
};

import _ from 'lodash';

export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const updateAlert = config => {
  const defaults = {
    type: HIDE_ALERT,
    payload: {
      status: 'normal',
      visible: false,
      msg: 'No message provided.'
    }
  };
  return _.merge(defaults, config);
};

export const generateAlertPayload = (status, msg) => {
  return {
    type: SHOW_ALERT,
    payload: {
      visible: true,
      status,
      msg
    }
  };
};

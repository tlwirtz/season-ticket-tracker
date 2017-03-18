import * as actions from '../alert-actions';

describe('alert actions', () => {
  describe('update alert', () => {
    it('returns an action when no config passed', () => {
      const expectedAction = {
        type: actions.HIDE_ALERT,
        payload: {
          status: 'normal',
          visible: false,
          msg: 'No message provided.'
        }
      };

      const action = actions.updateAlert();
      expect(action).toEqual(expectedAction);
    });

    it('overrides defaults when config passed', () => {
      const expectedAction = {
        type: 'TEST_ALERT',
        payload: {
          status: 'normal',
          visible: true,
          msg: 'test message.'
        }
      };

      const testConfig = {
        type: 'TEST_ALERT',
        payload: {
          visible: true,
          msg: 'test message.'
        }
      };

      const action = actions.updateAlert(testConfig);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('generateAlertPayload', () => {
    it('generates an action to show alert', () => {
      const expectedAction = {
        type: actions.SHOW_ALERT,
        payload: {
          visible: true,
          status: 'test status',
          msg: 'test msg'
        }
      };

      const action = actions.generateAlertPayload('test status', 'test msg');
      expect(action).toEqual(expectedAction);
    });
  });
});

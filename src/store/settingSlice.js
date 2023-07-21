export const createSettingSlice = (set, get) => ({
  setting: {
    //serverHostIP: 'http://qr-order.speedtech.vn',
    serverHostIP: 'test-don-so.onha.vn',
    password: '22127888',
  },
  settingActions: {
    setServerHostIP: mode =>
      set(state => {
        state.setting.serverHostIP = mode;
      }),
    setPassword: password =>
      set(state => {
        state.setting.password = password;
      }),
  },
});

export const settingSelectors = {
  serverHostIP: state => state.setting.serverHostIP,
  setServerHostIP: state => state.settingActions.setServerHostIP,
  password: state => state.setting.password,
  setPassword: state => state.settingActions.setPassword,
};

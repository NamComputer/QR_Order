import create from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-community/async-storage';
import {immer} from './middlewares';
import {createSettingSlice} from './settingSlice';

const store = (set, get) => ({
  ...createSettingSlice(set, get),
});

export const useStore = create(
  devtools(
    immer(
      persist(
        (set, get) => ({
          hydrated: false,
          firstRun: true,
          clearFirstRun: () => set({firstRun: false}),
          setHydrated: () => set({hydrated: true}),
          ...store(set, get),
        }),
        {
          getStorage: () => AsyncStorage,
          name: 'QR_Order',
          // whitelist: ['firstRun', 'setting'], // old zustand
          // new version of zustand: https://github.com/pmndrs/zustand/wiki/Persisting-the-store's-data
          partialize: state => ({
            firstRun: state.firstRun,
            setting: state.setting,
            auth: state.auth,
          }),
          onRehydrateStorage: () => (state, error) => {
            if (state) {
              state.setHydrated();
            }
          },
        },
      ),
    ),
  ),
);

//#region Util - Có thể dùng ngoài react component
export const getServerHostIP = () => useStore.getState().setting.serverHostIP;
//#endregion

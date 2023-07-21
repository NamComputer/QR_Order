import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {settingSelectors, useStore} from './store';

import RNExitApp from 'react-native-exit-app';

export const Setting = ({navigation}: {navigation: any}) => {
  const serverHostIP = useStore(settingSelectors.serverHostIP);
  const setServerHostIP = useStore(settingSelectors.setServerHostIP);
  const [IPTemp, setIPTemp] = useState(serverHostIP);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [orientation, setOrientation] = useState('PORTRAIT');
  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
        }}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{fontSize: orientation == 'PORTRAIT' ? 25 : 25}}>
          Server Host IP:
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TextInput
            value={IPTemp}
            onChangeText={text => {
              setIPTemp(text);
            }}
            style={{
              marginLeft: 5,
              color: 'black',
              backgroundColor: 'lightgray',
              borderRadius: 5,
              flexDirection: 'column',
              width:
                orientation == 'PORTRAIT'
                  ? windowWidth * 0.6
                  : windowWidth * 0.7,
              height:
                orientation == 'PORTRAIT'
                  ? windowHeight * 0.1
                  : windowHeight * 0.2,
              fontSize: orientation == 'PORTRAIT' ? 25 : 30,
              borderColor: 'black',
              borderWidth: 1,
              textAlign: 'center',
            }}
          />

          {IPTemp !== serverHostIP && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignContent: 'space-between',
              }}>
              <FontAwesome
                name="check-circle"
                onPress={() => setServerHostIP(IPTemp)}
                size={orientation == 'PORTRAIT' ? 40 : 50}
                color="#00FF00"
              />

              <Entypo
                name="circle-with-cross"
                onPress={() => setIPTemp(serverHostIP)}
                size={orientation == 'PORTRAIT' ? 40 : 50}
                color="#C70000"
              />
            </View>
          )}
        </View>
      </View>

      <View style={{margin: 10}}>
        <TouchableOpacity
          style={{
            height:
              orientation == 'PORTRAIT'
                ? windowHeight * 0.1
                : windowHeight * 0.1,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            RNExitApp.exitApp();
          }}
          color={'red'}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  BackHandler,
  Alert,
  Button,
  Dimensions,
  PermissionsAndroid
} from 'react-native';

import {useStore, settingSelectors} from './store';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import RNExitApp from 'react-native-exit-app';


export const Home = ({navigation}) => {
  const [link, setLink] = useState(false);
  const [forgetPW, setForgetPW] = useState(false);
  const [password, setPassword] = useState('');
  const [showErr, setShowErr] = useState('');
  const [showSetScreen, setShowScreen] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [orientation, setOrientation] = useState('PORTRAIT');
  const serverHostIP = useStore(settingSelectors.serverHostIP);
  const setServerHostIP = useStore(settingSelectors.setServerHostIP);

  const defaultPW = useStore(settingSelectors.password);
  const setDefaultPW = useStore(settingSelectors.setPassword);

  // const [stateDefaultPW, setStateDefaultPW] = useState(defaultPW);
  const [IPTemp, setIPTemp] = useState(serverHostIP);
  const [pwTemp, setPWTemp] = useState('');

  const [newPW, setNewPW ] = useState('');
  const [confirmPWTemp, setConfirmPWTemp] = useState('');
  const [fileData, setFileData] = useState();

  var RNFS = require('react-native-fs');
  var filePath = RNFS.ExternalStorageDirectoryPath + '/security.json';

  const readFile = async (path) => {
    const response = await RNFS.readFile(path);
    setFileData(response); //set the value of response to the fileData Hook.
  };
  useEffect(() => {
    readFile(filePath);
  }, []);

  useEffect(() => {
    //get user's file paths from react-native-fs

    console.log('DocumentsFolder',RNFS.ExternalStorageDirectoryPath); //alternative to MainBundleDirectory.
   
  }, []);


  useEffect(() => {
    console.log('Default pw', newPW)

    console.log('pw from file')
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);




  const checkCurrentPassword = () => {

    
    if (pwTemp === defaultPW && newPW === confirmPWTemp ) {


      // create a path you want to write to
      var path = RNFS.ExternalStorageDirectoryPath + '/security.json';
    
      // write the file
      RNFS.writeFile(path, newPW, 'utf8')
      .then((success) => {
      console.log('FILE WRITTEN!');
      })
      .catch((err) => {
      console.log(err.message);
      }); 

      setDefaultPW(newPW)
      Alert.alert('Your password changed!')
    } else {
      Alert.alert('Your password wrong!')
      setNewPW('')
      setConfirmPWTemp('')
      setPWTemp('')
    }
  };

  const onPressSubmitButton = () => {
    const isAuthenticated = password === defaultPW;

    if (isAuthenticated) {
      // setIsVisible(false);
      setShowScreen(true);
      setPassword('');
      setShowErr('');
      // navigation.navigate('Setting');
    } else {
      setShowErr('Invalid password');
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Warning', 'Please use "Logout" button on app!');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        onLongPress={() => {
          setForgetPW(true);
        }}>
        <Image
          style={{
            width:
              orientation == 'PORTRAIT' ? windowWidth * 0.8 : windowWidth * 0.9,
            height:
              orientation == 'PORTRAIT'
                ? windowHeight * 0.3
                : windowHeight * 0.5,
          }}
          resizeMode={'contain'}
          source={require('/Volumes/ROG/SPEED_POS_JOB/QR_Order/src/assets/speed-logo.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Browser', {url: serverHostIP})}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            fontSize: orientation == 'PORTRAIT' ? 25 : 25,
            color: 'blue',
            textDecorationLine: 'underline',
          }}>
          Link to QR-Order
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setLink(true)}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            fontSize: orientation == 'PORTRAIT' ? 25 : 25,
            color: 'blue',
            textDecorationLine: 'underline',
          }}>
          Setup Link
        </Text>
      </TouchableOpacity>
      
      <Text 
         style={{
            fontSize: orientation == 'PORTRAIT' ? 25 : 25,
            color: 'red',
            textDecorationLine: 'underline',
          }}>
            {fileData}
      </Text>
  
      {/* <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false), setShowScreen(false);
        }}
        backdropColor="#000000"
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}xr
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        {renderModalContent()}
      </Modal> */}

      <Modal
        isVisible={link}
        backdropColor="#000000"
        backdropOpacity={0.9}
        onBackdropPress={() => {
          setLink(false), setShowScreen(false);
        }}>
        {!showSetScreen ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                marginTop:
                  orientation == 'PORTRAIT'
                    ? windowHeight * 0.3
                    : windowHeight * 0.25,
                alignSelf: 'center',
              }}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{fontSize: orientation == 'PORTRAIT' ? 25 : 25}}>
                Login
              </Text>
              <TextInput
                style={{
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
                secureTextEntry={true}
                inputMode="numeric"
                value={password}
                onChangeText={val => {
                  setPassword(val), setShowErr('');
                }}
              />
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.Text}>
                {password ? showErr : ''}
              </Text>
            </View>

            <View
              style={{
                margin: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  height:
                    orientation == 'PORTRAIT'
                      ? windowHeight * 0.1
                      : windowHeight * 0.1,
                  width:
                    orientation == 'PORTRAIT'
                      ? windowWidth * 0.4
                      : windowWidth * 0.4,
                  backgroundColor: '#2d67d2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  setLink(false);
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height:
                    orientation == 'PORTRAIT'
                      ? windowHeight * 0.1
                      : windowHeight * 0.1,
                  width:
                    orientation == 'PORTRAIT'
                      ? windowWidth * 0.4
                      : windowWidth * 0.4,
                  backgroundColor: '#2d67d2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  onPressSubmitButton();
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'column',

                justifyContent: 'center',
                marginTop:
                  orientation == 'PORTRAIT'
                    ? windowHeight * 0.3
                    : windowHeight * 0.25,
              }}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{fontSize: orientation == 'PORTRAIT' ? 25 : 25}}>
                Server Host IP
              </Text>
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

            <View style={{margin: 10}}>
              <TouchableOpacity
                style={{
                  height:
                    orientation == 'PORTRAIT'
                      ? windowHeight * 0.1
                      : windowHeight * 0.1,
                  width:
                    orientation == 'PORTRAIT'
                      ? windowWidth * 0.4
                      : windowWidth * 0.5,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  setShowScreen(false);
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
      {/* Change Password Modal */}

      <Modal
        isVisible={forgetPW}
        backdropColor="#000000"
        backdropOpacity={0.9}
        onBackdropPress={() => {
          setForgetPW(false), setShowScreen(false);
        }}>
        {!showSetScreen ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                marginTop:
                  orientation == 'PORTRAIT'
                    ? windowHeight * 0.15
                    : windowHeight * 0.1,
                alignSelf: 'center',
              }}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{fontSize: orientation == 'PORTRAIT' ? 25 : 25}}>
                Current Password
              </Text>
              <TextInput
                style={{
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
                      : windowHeight * 0.1,
                  fontSize: orientation == 'PORTRAIT' ? 25 : 30,
                  borderColor: 'black',
                  borderWidth: 1,
                  textAlign: 'center',
                }}
                secureTextEntry={true}
                inputMode="numeric"
    
                onChangeText={val => {
                  setPWTemp(val);
      
                }}
              />      
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{fontSize: orientation == 'PORTRAIT' ? 25 : 25}}>
                New Password
              </Text>
              <TextInput
                style={{
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
                      : windowHeight * 0.1,
                  fontSize: orientation == 'PORTRAIT' ? 25 : 30,
                  borderColor: 'black',
                  borderWidth: 1,
                  textAlign: 'center',
                }}
                secureTextEntry={true}
                inputMode="numeric"
       
                onChangeText={val => {
                setNewPW(val)
                }}
              />
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{fontSize: orientation == 'PORTRAIT' ? 25 : 25}}>
                Confirm New Password
              </Text>
              <TextInput
                style={{
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
                      : windowHeight * 0.1,
                  fontSize: orientation == 'PORTRAIT' ? 25 : 30,
                  borderColor: 'black',
                  borderWidth: 1,
                  textAlign: 'center',
                }}
                secureTextEntry={true}
                inputMode="numeric"
          
                onChangeText={val => {
                  setConfirmPWTemp(val)
                }}
              />
            

              
            </View>

            <View
              style={{
                margin: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  height:
                    orientation == 'PORTRAIT'
                      ? windowHeight * 0.1
                      : windowHeight * 0.1,
                  width:
                    orientation == 'PORTRAIT'
                      ? windowWidth * 0.4
                      : windowWidth * 0.4,
                  backgroundColor: '#2d67d2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  setForgetPW(false);
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height:
                    orientation == 'PORTRAIT'
                      ? windowHeight * 0.1
                      : windowHeight * 0.1,
                  width:
                    orientation == 'PORTRAIT'
                      ? windowWidth * 0.4
                      : windowWidth * 0.4,
                  backgroundColor: '#2d67d2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  checkCurrentPassword();
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'column',

                justifyContent: 'center',
                marginTop:
                  orientation == 'PORTRAIT'
                    ? windowHeight * 0.3
                    : windowHeight * 0.25,
              }}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{fontSize: orientation == 'PORTRAIT' ? 25 : 25}}>
                Server Host IP
              </Text>
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

            <View style={{margin: 10}}>
              <TouchableOpacity
                style={{
                  height:
                    orientation == 'PORTRAIT'
                      ? windowHeight * 0.1
                      : windowHeight * 0.1,
                  width:
                    orientation == 'PORTRAIT'
                      ? windowWidth * 0.4
                      : windowWidth * 0.5,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  setShowScreen(false);
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>

      <TouchableOpacity
        style={{
          marginTop:
            orientation == 'PORTRAIT'
              ? windowHeight * 0.5
              : windowHeight * 0.25,
          height:
            orientation == 'PORTRAIT' ? windowHeight * 0.1 : windowHeight * 0.1,
          width:
            orientation == 'PORTRAIT' ? windowWidth * 0.8 : windowWidth * 0.9,
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
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  Text: {
    color: 'red',
  },
});

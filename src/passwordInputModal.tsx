import React, {Component, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import Modal from 'react-native-modal';

export const PasswordInputModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');

  const onPressSubmitButton = () => {
    //Use any authentication method you want according to your requirement.
    //Here, it is taken as authenticated if and only if the input password is "12345".

    const isAuthenticated = password == '12345'; //If input password is '12345', isAuthenticated gets true boolean value and false otherwise.

    if (isAuthenticated) {
      //   this.props.navigation.navigate(this.state.navigateTo);
    } else {
      console.log('Invalid password'); //Prompt an error alert or whatever you prefer.
    }
  };

  const renderModalContent = () => (
    <View>
      <TextInput value={password} onEndEditing={val => setPassword(val)} />
      <Button
        onPress={() => onPressSubmitButton()}
        title="Submit"
        color="#841584"
      />
    </View>
  );

  return (
    <Modal
      isVisible={isVisible}
      backdropColor="#000000"
      backdropOpacity={0.9}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      {renderModalContent()}
    </Modal>
  );
};

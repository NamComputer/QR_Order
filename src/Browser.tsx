import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, useColorScheme, View} from 'react-native';

import WebView from 'react-native-webview';

export const Browser = ({route, navigation}: {navigation: any; route: any}) => {
  const {url} = route.params;
  return (
    <View style={styles.container}>
      <WebView source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

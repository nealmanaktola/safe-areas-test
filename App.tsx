/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  NativeModules,
  Button
} from 'react-native';
import { WebView } from 'react-native-webview';
import createWebviewHtmlFile from './createHtml';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ImmersiveMode = NativeModules.ImmersiveModeModule;

const Activity = () => {
  const [source, setSource] = React.useState<string | null>(null);

  React.useEffect(() => {
    createWebviewHtmlFile({
      iFrameUri: "https://www.google.com/",
    }).then((path) => {
      console.log('got path', path);
      setSource(path);
    })
  }, []);

  if (source == null) return null;

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: `https://google.com`
        }}
        originWhitelist={['*']}
        allowFileAccess
        >
      </WebView>
      <View style={[StyleSheet.absoluteFill, {justifyContent: 'center'}]}>
        <Button title="Show Bars" onPress={() => ImmersiveMode.toggleSystemBars(true)} />
        <View style={{paddingTop: 10}}></View>
        <Button title="Hide Bars" onPress={() => ImmersiveMode.toggleSystemBars(false)} />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Activity />
    </SafeAreaProvider>
  )
}

export default App;

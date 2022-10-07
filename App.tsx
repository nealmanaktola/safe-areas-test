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
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import createWebviewHtmlFile from './createHtml';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Activity = () => {
  const [source, setSource] = React.useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const webViewRef = React.useRef<WebView>();

  React.useEffect(() => {
    createWebviewHtmlFile({
      iFrameUri: "http://192.168.2.25:8083/",
      safeAreas: insets,
    }).then((path) => {
      setSource(path);
    })
  }, []);

  React.useEffect(() => {
    webViewRef?.current?.injectJavaScript(
      `
        var iframeDoc = document.getElementById("activityFrame").contentWindow.document;
        iframeDoc.documentElement.style.setProperty('--discord-safe-area-inset-left', '${insets.left}px');
        iframeDoc.documentElement.style.setProperty('--discord-safe-area-inset-right', '${insets.right}px');
        iframeDoc.documentElement.style.setProperty('--discord-safe-area-inset-top', '${insets.top}px');
        iframeDoc.documentElement.style.setProperty('--discord-safe-area-inset-bottom', '${insets.bottom}px');
      `
    );
  }, [insets])

  if (source == null) return null;

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{
          uri: `file://${source}`
        }}
        allowUniversalAccessFromFileURLs
        allowFileAccess>
      </WebView>
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

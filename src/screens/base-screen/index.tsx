import * as React from 'react';
import { FunctionComponent } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

interface BaseScreenProps {
    children: JSX.Element
}

const BaseScreen: FunctionComponent<BaseScreenProps> = (props: BaseScreenProps) => (
  <SafeAreaView style={styles.container}>
    <StatusBar />
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BaseScreen;

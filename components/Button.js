import * as React from 'react';
import { human } from 'react-native-typography'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../assets/theme';

export default class Button extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <TouchableOpacity style={styles.button}>
        <Text style={human.bodyWhite}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    width: '100%',
    backgroundColor: theme.colors.purple,
    borderRadius: 4,
    // h-offset v-offset blur spread color; more than one shadow
    // boxShadow: 0px 1px 2px rgba(0, 0, 0, 0.18), 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04);
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    height: theme.actionHeight,
    margin: theme.spacing,
  },
});

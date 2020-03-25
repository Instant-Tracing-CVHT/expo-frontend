import * as React from 'react';
import { human } from 'react-native-typography'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import HelpIcon from '../assets/icons/action/help.svg';
import theme from '../assets/theme';

export default class Link extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <TouchableOpacity style={styles.link}>
        <HelpIcon style={styles.icon} />
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    height: theme.actionHeight
  },
  icon: {
    marginRight: 8
  },
  text: {
    ...human.body,
    color: theme.colors.purple
  }
});

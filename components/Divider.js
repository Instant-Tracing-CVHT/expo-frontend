import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../assets/theme';

export default class Divider extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <View style={styles.divider} />
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing * 3,
  },
});

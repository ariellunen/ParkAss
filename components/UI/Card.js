import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Card = (props) => <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
Card.propTypes = {
  style: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};
export default Card;

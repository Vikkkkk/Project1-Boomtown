import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
import ItemCard from '../../components/ItemCard/ItemCard';
import { connect } from 'react-redux';

const ShareItemFormPreview = ({ shareItemPreview }) => {
  console.log(shareItemPreview);
  return <ItemCard item={shareItemPreview} />;
};
//trying to connect react with redux

//() in arrow function means implicit return
const mapStateToProps = state => {
  //the following return will not work because redux can't seem to follow the
  //nested states.
  // return {
  //   shareItemPreview: state
  // }

  return {
    ...state
  };
};

//connect takes in 2 arguments, and when we do function composition, we put them side by side just like here.
export default connect(mapStateToProps)(ShareItemFormPreview);

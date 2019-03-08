import React from 'react';
import ItemCard from '../../components/ItemCard/ItemCard';
import { connect } from 'react-redux';

const ShareItemFormPreview = ({ shareItemPreview, classes }) => {
  return (
    <ItemCard item={shareItemPreview} className={classes.shareFormPreview} />
  );
};
//trying to connect react with redux

const mapStateToProps = state => {
  return {
    ...state
  };
};

//connect takes in 2 arguments, and when we do function composition, we put them side by side just like here.
export default connect(mapStateToProps)(ShareItemFormPreview);

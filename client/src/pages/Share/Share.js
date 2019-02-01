import React from 'react';
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemFormPreview from '../../components/ShareItemFormPreview/ShareItemFormPreview';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 
  and upload an image.

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
// import ShareItemForm from '../../components/ShareItemForm';
// import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes, tags }) => {
  console.log(tags);
  console.log(classes);

  return (
    <div className={classes.sharePageFlex}>
      <Grid container className={classes.formPreview}>
        <Grid item xs={6}>
          <ShareItemFormPreview classes={classes} />
        </Grid>
        <Grid item xs={6}>
          <ShareItemForm classes={classes} tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Share);

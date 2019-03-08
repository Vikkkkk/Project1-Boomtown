const styles = theme => ({
  root: {
    background: 'white',
    height: '100%'
  },
  container: {
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  suck: {
    color: theme.palette.primary.main,
    width: '100%',
    fontSize: '3rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textAlign: 'center',
    paddingLeft: 15,
    paddingTop: 50
  }
});

export default styles;

const styles = theme => ({
  profileWrapper: {
    background: theme.palette.secondary.main,
    padding: '5%'
  },
  profileTitle: {
    color: theme.palette.primary.main,
    fontSize: '2rem'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 0'
  },
  userName: {
    fontSize: ' 2.8125rem',
    fontWeight: 400,
    lineHeight: '1.06667em',
    marginLeft: '.3rem',
    marginBottom: '.5rem'
  },
  itemsInfo: {
    fontSize: '1.3125rem',
    fontWeight: 500,
    lineHeight: '1.16667em',
    marginBottom: '.5rem'
  },
  bio: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.5em',
    marginBottom: '1.5rem'
  }
});

export default styles;

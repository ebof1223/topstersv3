import { createStyles } from '@material-ui/styles';

const styles = createStyles({
  record: {
    position: 'absolute',
    right: 0,
    marginRight: '15%',
    height: '750px',
  },
  UserToppingsContainer: {
    background: 'rgb(255,255,255)',
    margin: '0 20%',
    padding: '0.5rem',
    borderRadius: '2px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 250px)',
    gridTemplateRows: 'repeat(3, 250px)',
    gridGap: '10px',
    zIndex: 5,
  },
});

export default styles;
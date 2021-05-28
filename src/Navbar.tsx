import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles';

import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';

interface Props {
  classes: {
    Navbar: string;
    Navigation: string;
  };
}

const Navbar: React.FC<Props> = ({ classes }) => {
  return (
    <header className={classes.Navbar}>
      <Link to={'/'}>
        <HomeIcon style={{ marginLeft: '3rem' }} />
      </Link>
      {/* <div className={classes.Navigation}>
        <Link to={'/'} style={{ textDecoration: 'none', marginLeft: '2rem' }}>
        </Link>
      </div> */}
      <EditIcon style={{ marginRight: '3rem' }} />
    </header>
  );
};

export default withStyles(styles)(Navbar);

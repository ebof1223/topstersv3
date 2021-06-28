import { withStyles } from '@material-ui/styles';
import styles from './landing-styles/LandingStyles';
import image from './landing-styles/landing.jpg';
import LoginModule from './LoginModule';

interface Props {
  classes: {
    Scene: string;
    Frame: string;
    Image: string;
  };
  history: any;
}

const Landing: React.FC<Props> = ({ classes, history }) => {
  return (
    <>
      <LoginModule history={history} />
      <div className={classes.Scene}>
        <div className={classes.Frame}>
          <img className={classes.Image} src={image} alt="background albums" />
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(Landing);
import { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TopsterTemplate } from '../interface';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './main-styles/Main-styles';
import UserTopsters from './UserTopsters';
import DeleteModal from './DeleteModal';
import Recommended from './Recommended';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface Props {
  classes: {
    root: string;
    heading: string;
    OuterContainer: string;
    nav: string;
    Recommended: string;
    Fab: string;
    UserTopsters: string;
    RecommendedTitle: string;
    TitleContainer: string;
    BackButton: string;
    subMain: string;
    AOTD: string;
  };
  topsters: TopsterTemplate[];
  history: {
    goBack: () => void;
    push: (input: string) => void;
  };
  setTopsters: (input: TopsterTemplate[]) => void;
  recommended: any;
  setOpenLandingModal: (i: boolean) => void;
}

const Main: React.FC<Props> = ({
  topsters,
  history,
  setTopsters,
  classes,
  recommended,
  setOpenLandingModal,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(null);

  const toTopster = (id: string, type: string) => {
    type === 'recommended'
      ? history.push(`/recommended/${id}`)
      : history.push(`/topsters/${id}`);
  };

  const handleDeleteConfirmation = () => {
    let newTopster = topsters.filter((item) => item.id !== toBeDeleted);
    setTopsters([...newTopster]);

    setDeleteDialog(!deleteDialog);
  };

  const handleLandingModal = () => {
    history.push('/');
    setTimeout(() => {
      setOpenLandingModal(true);
    }, 500);
  };
  return (
    <div className={classes.root}>
      <div onClick={handleLandingModal} className={classes.BackButton}>
        <ArrowBackIcon fontSize="large" />
      </div>
      <div className={classes.OuterContainer}>
        <nav className={classes.nav}></nav>
        <h2 className={classes.RecommendedTitle}>Recommended</h2>
        <TransitionGroup className={classes.Recommended}>
          {recommended.map((item: any) => (
            <CSSTransition key={item.id} classNames="fade" timeout={500}>
              <Recommended
                {...item}
                handleClick={() => toTopster(item.id, 'recommended')}
                id={item.id}
                deleteDialog={deleteDialog}
                setDeleteDialog={setDeleteDialog}
                setToBeDeleted={setToBeDeleted}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
        <div className={classes.TitleContainer}>
          <h2>My Topsters</h2>
          <Link to={'/topsters/new'}>
            <Tooltip title="Add">
              <Fab
                color="inherit"
                aria-label="add"
                size="small"
                className={classes.Fab}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Link>
        </div>
        <div className={classes.subMain}>
          <div className={classes.UserTopsters}>
            {topsters.map((item: TopsterTemplate) => (
              <CSSTransition key={item.id} classNames="fade" timeout={500}>
                <UserTopsters
                  {...item}
                  handleClick={() => toTopster(item.id, 'userTopster')}
                  id={item.id}
                  deleteDialog={deleteDialog}
                  setDeleteDialog={setDeleteDialog}
                  setToBeDeleted={setToBeDeleted}
                />
              </CSSTransition>
            ))}
          </div>
          <img
            className={classes.AOTD}
            src="https://upload.wikimedia.org/wikipedia/en/3/38/Bob_Dylan_-_Blonde_on_Blonde.jpg"
            alt="album"
          />
        </div>
      </div>
      <DeleteModal
        handleDeleteConfirmation={handleDeleteConfirmation}
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
      />
    </div>
  );
};

export default withStyles(styles)(Main);

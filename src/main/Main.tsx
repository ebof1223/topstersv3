import { useEffect, useRef, useState } from 'react';
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
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
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
    UserTitleContainer: string;
    BackButton: string;
    subMain: string;
    AOTDContainer: string;
    AOTDContainerEmpty: string;
    AOTDTitleContainer: string;
    CompareArrowsIcon: string;
    firstBookmarkedItem: string;
    noBookmarks: string;
    RecommendedSection: string;
    topstersSection: string;
  };
  topsters: TopsterTemplate[];
  history: {
    goBack: () => void;
    push: (input: string) => void;
  };
  setTopsters: (input: TopsterTemplate[]) => void;
  recommended?: any;
  setOpenLandingModal: (i: boolean) => void;
  bookmarks: TopsterTemplate[];
}
const Main: React.FC<Props> = ({
  topsters,
  history,
  setTopsters,
  classes,
  recommended,
  setOpenLandingModal,
  bookmarks,
}) => {
  const AlwaysScrollToBottom = () => {
    const elementRef: React.MutableRefObject<HTMLDivElement> = useRef();
    useEffect(() => elementRef.current && elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(null);

  const toTopster = (id: string, type: string) => {
    if (type === 'recommended') history.push(`/recommended/${id}`);
    if (type === 'topsters') history.push(`/topsters/${id}`);
    if (type === 'bookmarks') history.push(`/bookmarks/${id}`);
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
    }, 100);
  };

  const sectionizedPer5Item = () => {
    let recommendedCopy = [...recommended];
    let sectionGrouping = [];
    while (recommendedCopy.length)
      sectionGrouping.push(recommendedCopy.splice(0, 5));
    return sectionGrouping;
  };

  const sectionizedPer8Item = () => {
    let userTopstersCopy = [...topsters];
    let sectionGrouping = [];
    while (userTopstersCopy.length)
      sectionGrouping.push(userTopstersCopy.splice(0, 8));
    return sectionGrouping;
  };

  return (
    <div className={classes.root}>
      <div className={classes.OuterContainer}>
        <div onClick={handleLandingModal} className={classes.BackButton}>
          <Tooltip title="Landing">
            <ArrowBackIcon fontSize="large" />
          </Tooltip>
        </div>
        <nav className={classes.nav} />
        <h2 className={classes.RecommendedTitle}>Recommended</h2>
        <TransitionGroup className={classes.Recommended}>
          {sectionizedPer5Item().map((group, i) => (
            <CSSTransition
              classNames="fade"
              timeout={500}
              key={`recommended-group-${i}`}
            >
              <section className={classes.RecommendedSection}>
                {group.map((item: TopsterTemplate) => (
                  <Recommended
                    {...item}
                    handleClick={() => toTopster(item.id, 'recommended')}
                    id={item.id}
                    recommended={recommended}
                    title={item.title}
                    key={`group-item-${item.id}`}
                  />
                ))}
              </section>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <div className={classes.UserTitleContainer}>
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
            {sectionizedPer8Item().map((group, i) => (
              <section
                key={`userTopsters-group-${i}`}
                className={classes.topstersSection}
              >
                {group.map((item: TopsterTemplate) => (
                  <CSSTransition key={item.id} classNames="fade" timeout={500}>
                    <UserTopsters
                      {...item}
                      handleClick={() => toTopster(item.id, 'topsters')}
                      id={item.id}
                      deleteDialog={deleteDialog}
                      setDeleteDialog={setDeleteDialog}
                      setToBeDeleted={setToBeDeleted}
                    />
                  </CSSTransition>
                ))}
                <AlwaysScrollToBottom />
              </section>
            ))}
          </div>
          {bookmarks.length ? (
            <div key={bookmarks[0].id} className={classes.AOTDContainer}>
              <Tooltip title="Rearrange">
                <CompareArrowsIcon
                  fontSize="large"
                  className={classes.CompareArrowsIcon}
                  onClick={() => history.push('/bookmarks')}
                />
              </Tooltip>
              {bookmarks.length &&
                bookmarks[0].albums.map((item) => (
                  <div
                    onClick={() => toTopster(bookmarks[0].id, 'bookmarks')}
                    className={classes.firstBookmarkedItem}
                    style={{
                      background: `url(${item.image[3]['#text']}) no-repeat center center/cover`,
                    }}
                    key={item.name}
                  />
                ))}
            </div>
          ) : (
            <div className={classes.AOTDContainerEmpty} key={'bookmarks'}>
              <h3 className={classes.noBookmarks}>You're all caught up!</h3>
            </div>
          )}
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

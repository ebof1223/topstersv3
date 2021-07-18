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
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

interface Props {
  classes: {
    root: string;
    heading: string;
    OuterContainer: string;
    nav: string;
    RecommendedTopsters: string;
    Fab: string;
    UserTopsters: string;
    RecommendedTitle: string;
    RecommendedTitleContainer: string;
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
    RecommendedContainer: string;
    topstersSection: string;
    recommendedArrowVisible: string;
    recommendedArrowHidden: string;
    dotContainerHorizontal: string;
    dotsHorizontalActive: string;
    dotsHorizontalInactive: string;
    dotsVerticalActive: string;
    dotsVerticalInactive: string;
    dotContainerVertical: string;
  };
  topsters: TopsterTemplate[];
  history: {
    goBack: () => void;
    push: (input: string) => void;
  };
  setTopsters: (input: TopsterTemplate[]) => void;
  recommended: any;
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
  const RecommendedSectionalRef = useRef(null);
  const TopsterContainerRef = useRef(null);

  const elementRef: React.MutableRefObject<HTMLDivElement> = useRef();
  useEffect(() => {
    elementRef.current && elementRef.current.scrollIntoView();
  }, []);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [currentRecSection, setCurrentRecSection] = useState(null);
  const [currentTopSection, setCurrentTopSection] = useState(null);
  const [currentRecIndex, setCurrentRecIndex] = useState(0);
  const [currentTopsterIndex, setCurrentTopsterIndex] = useState(null);
  // var onScreen: boolean;

  const toTopster = (id: string, type: string) => {
    history.push(`/${type}/${id}`);
  };

  useEffect(() => {
    setCurrentRecSection(
      RecommendedSectionalRef.current.parentElement.childNodes[currentRecIndex]
    );
    setCurrentTopSection(
      TopsterContainerRef.current.childNodes[
        TopsterContainerRef.current.childNodes.length - 1
      ]
    );

    setCurrentTopsterIndex(TopsterContainerRef.current.childNodes.length - 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const dotIndicators = (type: string) => {
    var dotCount: Number[];
    type === 'recommended'
      ? (dotCount = new Array(Math.ceil(recommended.length / 5))).fill(0)
      : (dotCount = new Array(Math.ceil(topsters.length / 8))).fill(0);
    return (
      <>
        {dotCount.map((item: null, i: number) => (
          <div
            className={
              (type === 'recommended' &&
                (i === currentRecIndex
                  ? classes.dotsHorizontalActive
                  : classes.dotsHorizontalInactive)) ||
              (type === 'topsters' &&
                (i === currentTopsterIndex
                  ? classes.dotsVerticalActive
                  : classes.dotsVerticalInactive))
            }
            key={`recommended-dot-${i}`}
          />
        ))}
      </>
    );
  };

  const handleArrows = (direction: string) => {
    if (direction === 'next' && currentRecSection.nextSibling) {
      currentRecSection.nextSibling?.scrollIntoView({ behavior: 'smooth' });
      setCurrentRecSection(currentRecSection.nextSibling);
      setCurrentRecIndex(currentRecIndex + 1);
    }
    if (direction === 'previous' && currentRecSection.previousSibling) {
      currentRecSection.previousSibling?.scrollIntoView({ behavior: 'smooth' });
      setCurrentRecSection(currentRecSection.previousSibling);
      setCurrentRecIndex(currentRecIndex - 1);
    }
  };

  return (
    <div className={classes.root}>
      <div onClick={handleLandingModal} className={classes.BackButton}>
        <Tooltip title="Landing">
          <ArrowBackIcon fontSize="large" />
        </Tooltip>
      </div>
      <div className={classes.OuterContainer}>
        <nav className={classes.nav} />
        <div className={classes.RecommendedTitleContainer}>
          <h2 className={classes.RecommendedTitle}>Recommended</h2>
          <div className={classes.dotContainerHorizontal}>
            {dotIndicators('recommended')}
          </div>
        </div>
        <div className={classes.RecommendedContainer}>
          <ArrowLeftIcon
            className={
              currentRecSection && currentRecSection.previousSibling
                ? classes.recommendedArrowVisible
                : classes.recommendedArrowHidden
            }
            color="primary"
            onClick={() => handleArrows('previous')}
          />
          <TransitionGroup className={classes.RecommendedTopsters}>
            {sectionizedPer5Item().map((group, i) => (
              <CSSTransition
                classNames="fade"
                timeout={500}
                key={`recommended-group-${i}`}
              >
                <section
                  className={classes.RecommendedSection}
                  ref={RecommendedSectionalRef}
                >
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
          <ArrowRightIcon
            className={
              currentRecSection && currentRecSection.nextSibling
                ? classes.recommendedArrowVisible
                : classes.recommendedArrowHidden
            }
            color="primary"
            onClick={() => handleArrows('next')}
          />
        </div>
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
          <div className={classes.dotContainerVertical}>
            {dotIndicators('topsters')}
          </div>
          {/* <<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div className={classes.UserTopsters} ref={TopsterContainerRef}>
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
                <div ref={elementRef} />
              </section>
            ))}
          </div>
          {bookmarks.length ? (
            <div key={bookmarks[0].id} className={classes.AOTDContainer}>
              <Tooltip title="Rearrange">
                <CompareArrowsIcon
                  className={classes.CompareArrowsIcon}
                  onClick={() => history.push('/bookmarks')}
                  color="primary"
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

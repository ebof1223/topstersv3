import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import styles from './styles/MiniToppingsStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { AlbumStructure } from './interface';

interface Props {
  classes: {
    root: string;
    title: string;
    avatar: string;
    miniToppings: string;
    deleteIcon: string;
    card: string;
  };
  title: string;
  albums: AlbumStructure[];
  id: string;
  deleteDialog: boolean;
  setDeleteDialog: (input: boolean) => void;
  handleClick: () => void;
  setToBeDeleted: (input: string) => void;
}

const MiniToppings: React.FC<Props> = ({
  classes,
  title,
  albums,
  id,
  deleteDialog,
  setDeleteDialog,
  handleClick,
  setToBeDeleted,
}) => {
  const miniToppings = albums.map((item) => (
    <div
      className={classes.miniToppings}
      style={{
        background: `url(${item.image[3]['#text']}) no-repeat center center/cover`,
      }}
      key={item.name}
    />
  ));

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setToBeDeleted(id);
    setDeleteDialog(!deleteDialog);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.card} onClick={handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={(e) => handleDelete(e)}
        />
        {miniToppings}
        {/* <h5 className={classes.title}>{title}</h5> */}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(MiniToppings);

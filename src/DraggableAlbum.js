import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3.5px",
    cursor: "grab",
    "&:active": {
      cursor: "none",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: 0,
    bottom: 0,
    padding: " 10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "0.7rem",
  },
  links: {
    position: "absolute",
    display: "inline-block",
    margin: "0 auto",
    bottom: 0,
    right: 0,
    opacity: 1,
    marginRight: "0.25rem",
    marginBottom: "0.25rem",
    "&:hover svg": {
      color: "white",
      transition: "0.5s",
      transform: "scale(1.2)",
      cursor: "pointer",
    },
  },
};
const DraggableAlbum = SortableElement(({ cover, classes, onClick }) => {
  return (
    <div
      style={{
        background: `url(${cover}) no-repeat center center/cover`,
      }}
      className={classes.root}
      onClick={onClick}
      id='draggable'
    >
      <div className={classes.boxContent}>
        <span className={classes.links}>
          <DeleteIcon className={classes.deleteIcon} />
        </span>
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableAlbum);
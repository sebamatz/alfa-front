
import * as React from "react";

import { Link } from "react-router-dom";

import { Button, createStyles, makeStyles,Theme } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface IAppProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link:{
      textDecoration: "none",
    }
  })
);

const BackToMenu: React.FunctionComponent<IAppProps> = (props) => {
 
 const classes = useStyles();
 
 return (
    <Link className={classes.link} to="/#">
      <Button color="primary" startIcon={<ArrowBackIcon />}>
        Menu
      </Button>
    </Link>
  );
};

export default BackToMenu;

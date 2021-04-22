import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { grey, red } from "@material-ui/core/colors";
import DrawerOptions from "components/Navigation/utils/DrawerOptions";
import { LogOutButton, LogOutIcon } from "components/UI/Buttons/Buttons";
import { FaSignOutAlt } from "react-icons/fa";
import { IconButton } from "@material-ui/core";
import Proptypes from "prop-types";

// Styles
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: red[500],
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerContainer: {
    overflow: "auto",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: grey[50],
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  logoutButtonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

// Main Component
const Navigation = (props) => {
  const { window, isAuthenticated, location } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <React.Fragment>
      <div
        className={classes.toolbar}
        style={{ backgroundColor: "rgb(244, 67, 54)" }}
      />
      <Divider />
      <List>
        <DrawerOptions location={location} />
      </List>
    </React.Fragment>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {location !== '/cocina' && <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isAuthenticated ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography variant="h6" noWrap className={classes.title}>
            Red Pepper App
          </Typography>
          {isAuthenticated ? (
            <div>
              <Hidden xsDown implementation="css">
                <LogOutButton onClick={props.onLogout}>
                  <div className={classes.logoutButtonContent}>
                    <FaSignOutAlt style={{ marginBottom: "2px" }} />
                    <Typography variant="body2" style={{ marginLeft: "5px" }}>
                      Cerrar Sesión
                    </Typography>
                  </div>
                </LogOutButton>
              </Hidden>
              <Hidden smUp implementation="css">
                <LogOutIcon onClick={props.onLogout}>
                  <FaSignOutAlt />
                </LogOutIcon>
              </Hidden>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>}

      {(location !== '/cocina' || location !== '/login') && isAuthenticated ? (
        <nav className={classes.drawer} aria-label="menu options">
          {/* Mobile Version */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              onClick={handleDrawerToggle}
            >
              {drawer}
            </Drawer>
          </Hidden>

          {/* Desktop Version */}
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      ) : null}
    </div>
  );
};

Navigation.propTypes = {
  window: Proptypes.object,
  isAuthenticated: Proptypes.string,
  location: Proptypes.string.isRequired,
};

export default Navigation;

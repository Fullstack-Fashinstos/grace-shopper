import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  blue: {
    backgroundColor: "#a2cffe",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "10px"
  },
  toolbar: {
    display: "flex",
    color: "black",
    justifyContent: "space-between",
  }
}));

const Navbar = ({ handleClick, isLoggedIn }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.blue}>
      <Toolbar className={classes.toolbar}>
        <h2>SoleFactor</h2>
        {isLoggedIn ? (
          <div id="navDiv">
            <Link to="/products">Products</Link>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orderHistory">Order History</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div id="navDiv">
            <Link to="/products">Products</Link>
            {/* The navbar will show these links before you log in */}
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
)};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

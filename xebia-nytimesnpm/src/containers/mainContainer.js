import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, NavbarBrand, Toast, ToastBody, ToastHeader } from "reactstrap";
import Loader from "../components/Loader/Loader";
import PropTypes from "prop-types";
import {
  getArticlesErrorSelector,
  getArticlesLoadingSelector,
  getSelectedArticleSelector
} from "../reducers/selectors";

class MainContainer extends Component {
  render() {
    const { loading, error, selectedArticle, children } = this.props;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand style={{ color: "#fff" }}>
            NY Times Most Popular{" "}
            {selectedArticle && selectedArticle.section
              ? "- " + selectedArticle.section
              : null}
          </NavbarBrand>
        </Navbar>
        {error && (
          <div className="p-3">
            <Toast>
              <ToastHeader>Error</ToastHeader>
              <ToastBody>
                Something went wrong. Please refresh and try again!
              </ToastBody>
            </Toast>
          </div>
        )}
        {loading && <Loader />}
        {children}
      </div>
    );
  }
}

MainContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  selectedArticle: PropTypes.shape({
    section: PropTypes.string.isRequired
  }),
  error: PropTypes.any
};

const mapStateToProps = state => {
  return {
    loading: getArticlesLoadingSelector(state),
    error: getArticlesErrorSelector(state),
    selectedArticle: getSelectedArticleSelector(state)
  };
};

export default connect(mapStateToProps)(MainContainer);

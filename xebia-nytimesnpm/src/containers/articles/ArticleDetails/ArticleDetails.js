import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions";
import styles from "./styles.css";
import { getSelectedArticleSelector } from "../../../reducers/selectors";

export class ArticleDetails extends Component {
  componentDidMount() {
    if (!this.props.selectedArticle) {
      const { id } = this.props.match.params;
      this.props.getArticle(id);
    }
  }

  onBackToList = () => {
    this.props.deselectArticle();
    this.props.history.push("/");
  };

  render() {
    if (!this.props.selectedArticle) {
      return <span>Loading...</span>;
    }

    return (
      <div className={styles.ArticleDetailsWrapper}>
        <div className="container">
          <div className="a-detail">
            <div className={styles.BackToList}>
              <button onClick={this.onBackToList}>Back to list</button>
            </div>
            <h1 className={styles.Title}>
              <a
                href={this.props.selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.selectedArticle.title}
              </a>
            </h1>

            <div className="row">
              <div className="col-md-6">
                <div className={styles.MainImageHolder}>
                  <figure>
                    <img
                      src={
                        this.props.selectedArticle.media[0]["media-metadata"][2]
                          .url
                      }
                      alt={this.props.selectedArticle.media[0].caption}
                    />
                    <figcaption>
                      {this.props.selectedArticle.media[0].caption}
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.ByLine}>
                  {this.props.selectedArticle.byline}
                </div>
                <div className={styles.PublishedDate}>
                  <time>{this.props.selectedArticle.published_date}</time>
                </div>

                <p className={styles.Content}>
                  {this.props.selectedArticle.abstract}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleDetails.propTypes = {
  selectedArticle: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        caption: PropTypes.string,
        "media-metadata": PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired
          })
        ).isRequired
      })
    ).isRequired,
    byline: PropTypes.string.isRequired,
    abstract: PropTypes.string.isRequired
  }),
  getArticle: PropTypes.func.isRequired,
  deselectArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    selectedArticle: getSelectedArticleSelector(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getArticle: actions.getArticle,
      deselectArticle: actions.deselectArticle
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetails);

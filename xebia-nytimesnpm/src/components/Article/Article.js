import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.css";

export class Article extends Component {
  onArticleClick = () => {
    this.props.onArticleClick(this.props.article);
  };

  render() {
    return (
      <article onClick={this.onArticleClick} className={styles.Article}>
        <div className="each-article">
          <div className={styles.ArticleImgHolder}>
            <img
              src={this.props.article.media[0]["media-metadata"][0].url}
              alt={this.props.article.media[0].caption}
            />
          </div>
          <div className={styles.ArticleContentHolder}>
            <div className="title">{this.props.article.title}</div>
            <div className="clear">
              <div className="float-left">
                <span className={styles.ArticleByLine}>
                  {this.props.article.byline}
                </span>
              </div>
              <div className="float-right">
                <span className={styles.ArticlePublishedDateIcon}>
                  <FontAwesomeIcon icon="calendar-alt" />
                </span>
                <span className={styles.ArticlePublishedDate}>
                  {this.props.article.published_date}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.ArticleButtonHolder}>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
        </div>
      </article>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    byline: PropTypes.string,
    published_date: PropTypes.string,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        caption: PropTypes.string,
        "media-metadata": PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number,
            format: PropTypes.string
          })
        )
      })
    )
  }).isRequired,
  onArticleClick: PropTypes.func.isRequired
};

export default Article;

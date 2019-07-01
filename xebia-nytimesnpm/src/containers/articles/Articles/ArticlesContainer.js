import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions";
import Article from "../../../components/Article/Article";
import { getArticlesSelector } from "../../../reducers/selectors";

export class ArticlesContainer extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  onArticleClicked = article => {
    this.props.selectArticle(article);
    this.props.history.push("/" + article.id);
  };

  render() {
    return (
      <section>
        <div className="container">
          {this.props.articles.map(article => (
            <Article
              key={article.id}
              article={article}
              onArticleClick={this.onArticleClicked}
            />
          ))}
        </div>
      </section>
    );
  }
}

ArticlesContainer.propTypes = {
  articles: PropTypes.array,
  getArticles: PropTypes.func.isRequired,
  selectArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    articles: getArticlesSelector(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getArticles: actions.getArticles,
      selectArticle: actions.selectArticle
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesContainer);

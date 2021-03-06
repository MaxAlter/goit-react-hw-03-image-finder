import React, { Component } from "react";
import Searchbar from "./components/Searchbar/searchbar";
import ImageGallery from "./components/ImageGallery/imageGallery";
import Loader from "./components/Loader/loader";
import Button from "./components/Button/button";
import Modal from "./components/Modal/modal";
import * as dataAPI from "./components/servise/api";

export default class App extends Component {
  state = {
    query: "",
    page: 1,
    articles: [],
    error: null,
    isLoading: false,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { articles, query } = this.state;
    if (prevState.articles !== articles) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }

    if (prevState.query !== query) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { page, query, articles } = this.state;
    this.setState({ isLoading: true });
    dataAPI
      .fetchArticles(query, page)
      .then(({ data }) => {
        this.setState({
          articles: [...articles, ...data.hits],
          page: page + 1,
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  newRequest = (query) => {
    this.setState({
      query,
      page: 1,
      articles: [],
    });
  };

  handleClickOnMore = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  };

  openModal = (largeImgURL) => {
    this.setState({ isModalOpen: true, largeImgURL });
    window.addEventListener("keydown", this.closeModal);
  };

  closeModal = (e) => {
    if (e.target === e.currentTarget || e.keyCode === 27)
      this.setState({ isModalOpen: false });
    window.removeEventListener("keydown", this.closeModal);
  };

  render() {
    const { articles, isLoading, largeImgURL, isModalOpen } = this.state;
    return (
      <div>
        <Searchbar newRequest={this.newRequest} />
        <ImageGallery items={articles} openModal={this.openModal} />
        {isLoading && <Loader />}
        {articles.length > 0 && <Button onClick={this.fetchArticles} />}
        {isModalOpen && (
          <Modal largeImgURL={largeImgURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

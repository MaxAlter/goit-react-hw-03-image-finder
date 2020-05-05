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
    const { articles, page } = this.state;
    if (prevState.articles !== articles) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }

    if (prevState.page !== page) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { query } = this.state;
    this.setState({ isLoading: true });
    dataAPI
      .fetchArticles(this.state.query, this.state.page)
      .then(({ data }) => {
        const { articles } = this.state;
        this.setState({ articles: [...articles, ...data.hits] });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
  ////////////////////////////////////////////
  newRequest = (query) => {
    this.setState({
      query,
      page: 1,
      articles: [],
    });
  };

  ////////////////////////////////////////////

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
        {articles.length > 0 && <Button onClick={this.handleClickOnMore} />}
        {isModalOpen && (
          <Modal largeImgURL={largeImgURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

/* <Searchbar onSubmit={this.fetchArticles} newRequest={this.newRequest} /> */

// fetchArticles = (query, page = 1) => {
//   this.setState({ isLoading: true, query });
//   dataAPI
//     .fetchArticles(query, page)
//     .then(({ data }) => {
//       const { articles } = this.state;
//       this.setState({ articles: [...articles, ...data.hits] });
//     })
//     .catch((error) => this.setState({ error }))
//     .finally(() => {
//       this.setState({ isLoading: false });
//     });
// };

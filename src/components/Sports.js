import React, { Component } from 'react'
import Newsitem from './Newsitem';
import "./News.css";
import { BounceLoader } from 'react-spinners';


export class Sports extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0 
    }
  }
  async fetchData(page){
    let url = `https://newsapi.org/v2/top-headlines?category=sports&apiKey=136cef8718984499a18771d56b327550&pageSize=12&page=${this.state.page}`;
    let data = await fetch(url);
    let pardata = await data.json();
    this.setState({ 
        articles: pardata.articles,
        totalResults: pardata.totalResults,
        page:page,
        loading:false
     });
  }
  async componentDidMount(){
    this.fetchData(this.state.page);
  }
  prevpage = async () => {
    if (this.state.page > 0) {
        this.fetchData(this.state.page - 1);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        window.scrollTo(0, 0);
    }
}

nextpage = async () => {
    const totalPages = Math.ceil(this.state.totalResults / 12);
    if (this.state.page + 1 < totalPages) {
        this.fetchData(this.state.page + 1);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        window.scrollTo(0, 0);
    }
}


  render() {
    let { mode } = this.props;
    return (
      <div className="container">
        <h1>SPORTS - TOP HEADLINES</h1>
        {this.state.loading &&<BounceLoader  className='load' color="#36d7b7" loading size={120}/>}
        <div className='row'>
          {this.state.articles.map((element) => {
            return (
                element.urlToImage &&
              <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title.slice(0, 100)} image={element.urlToImage} newsurl={element.url} theme={mode} />
              </div>
            );
          })}
        </div>
        <div className="btnsection">
          <button className='prevnextbtn' disabled={this.state.page<=1} onClick={this.prevpage}>&larr; Prev</button>
          <button className='prevnextbtn' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 12)} onClick={this.nextpage}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default Sports;

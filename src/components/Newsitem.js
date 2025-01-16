import React, { Component } from 'react'
import "./Newsitem.css"
export class Newsitem extends Component {
  render() {
    let {title , image, newsurl,theme} = this.props;
    const mode = theme === "light" ? "card_light" : "card_dark";
    const read = theme === "light" ? "read_light" : "read_dark";
    return (
      <div>
      <div className={mode} >
          <img src={image?image:"https://icrier.org/wp-content/uploads/2022/09/Event-Image-Not-Found.jpg"} className="card-img" alt="Error"/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5><br/><br/><br/><br/>
            <a href={newsurl} target='_blank' rel="noopener noreferrer"><button className={read} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
              Read more</button></a>
          </div>
      </div>
      </div>
    )
  }
}

export default Newsitem;
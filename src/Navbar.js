import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export class Navbar extends Component {
  state = {
    activeLink: null,
    searchQuery: ''
  };

  handleNavClick = (linkName, searchQuery) => {
    this.setState({ activeLink: linkName });
    this.props.search_category(searchQuery);
    window.scrollTo(0,0);
  };

  handleCheckboxChange = () => {
    this.props.toggleTheme();
  };

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value.toLowerCase() });
  };

  render() {
    const { theme } = this.props;
    const { activeLink, searchQuery } = this.state;

    return (
      <nav className={`navbar-${theme}`}>
        <div className='nav-title'>
          <Link
            className={`nav-head ${activeLink === null ? 'active' : ''}`}
            to="/"
            onClick={() => this.handleNavClick(null,'general')}
          >
            News Today
          </Link>
          <Link
            className={`nav-com ${activeLink === 'science' ? 'active' : ''}`}
            to="/science"
            onClick={() => this.handleNavClick('science', 'science')}
          >
            Science
          </Link>
          <Link
            className={`nav-com ${activeLink === 'technology' ? 'active' : ''}`}
            to="/technology"
            onClick={() => this.handleNavClick('technology', 'technology')}
          >
            Technology
          </Link>
          <Link
            className={`nav-com ${activeLink === 'sports' ? 'active' : ''}`}
            to="/sports"
            onClick={() => this.handleNavClick('sports', 'sports')}
          >
            Sports
          </Link>
        </div>
        <div className='nav_search'>
          <form>
            <input
              type='text'
              placeholder='Search topic'
              className='input-search'
              value={searchQuery}
              onChange={this.handleInputChange}
            />
            <Link to='/'>
              <button
                className='btn-search'
                type='button'
                onClick={() => this.handleNavClick(null, searchQuery)}
              >
                Search
              </button>
            </Link>
          </form>
        </div>
        <div>
          <input
            type="checkbox"
            className="theme-checkbox"
            checked={theme === 'dark'}
            onChange={this.handleCheckboxChange}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;

import './App.css';
import React, { Component, createRef } from 'react';
import Navbar from './Navbar';
import News from './components/News';
import Science from './components/Science';
import Technology from './components/Technology';
import Sports from './components/Sports';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AppContent = ({ theme, toggleTheme, search_category , category}) => {
  const location = useLocation(); // Get the current route location
  const nodeRef = createRef(); // Create a ref for the transitioning element

  return (
    <div className={theme}>
      <Navbar toggleTheme={toggleTheme} theme={theme} search_category={search_category} />
      <TransitionGroup>
        <CSSTransition
          key={location.key} // Unique key for transitions
          classNames="slide" // Use "slide" for the class names
          timeout={1000} // Duration of the transition
          nodeRef={nodeRef} // Add the nodeRef prop
        >
          <div ref={nodeRef} className="slide-content"> {/* Attach the ref here */}
            <Routes location={location}>
              <Route path='/' element={<News mode={theme} topic={category}/>} />
              <Route path='/science' element={<Science mode={theme} />} />
              <Route path='/technology' element={<Technology mode={theme} />} />
              <Route path='/sports' element={<Sports mode={theme} />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      category: 'general',
    };
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  };

  search_category = (topic) => {
    if(topic==='')
    {
      this.setState({
        category: 'general',
      });
    }
    else{
      this.setState({
        category: topic,
      });
    }
    
  };

  render() {
    const { theme } = this.state;
    const {category} = this.state;
    return (
      <AppContent theme={theme} toggleTheme={this.toggleTheme} search_category={this.search_category} category={category} />
    );
  }
}

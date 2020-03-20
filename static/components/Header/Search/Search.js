import React, {Component} from 'react';
import classes from './Search.css';

const Searcher = () => {

   return (
       <div className={classes.Searcher}>
          <div>
             <input type="text" id="filter" placeholder="Search..." /><button type="submit" value="" />
          </div>
       </div>
   )
};

export default Searcher;


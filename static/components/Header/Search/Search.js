import React, {Component} from 'react';
import classes from './Search.css';
import FilteredList from './FilerList/FilterList';
const Searcher = () => {

   return (
       <div className={classes.searcher}>
             <FilteredList/>

       </div>
   )
};

export default Searcher;

//<input type="text" id="filter" placeholder="Search..." /><button type="submit" value="" />

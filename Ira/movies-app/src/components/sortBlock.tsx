import React from 'react';
import { SortBy } from './homePage';


interface ISortProps {
    sortBy: string;
    setSortBy(sortOption: string): void;     
}


const SortBlock = (props: ISortProps) => {
    console.log(props);
    const {sortBy, setSortBy} = props; 
    return (
        <div className ="sortBlock">
            <p className = "sortBlockCaption">Sort by</p>
            <button type = "button" className = {
                                       sortBy === SortBy.Release ? "sortBlockButtonActive" : "sortBlockButtonNotActive"}                                                  
                                    onClick = {() => setSortBy(SortBy.Release)}>release date</button>
                                    
            <button type="button" className = {
                                       sortBy === SortBy.Rating ? "sortBlockButtonActive" : "sortBlockButtonNotActive"}                                                  
                                    onClick = {() => setSortBy(SortBy.Rating)}>rating</button>
        </div>
    );
    
};



export default SortBlock;
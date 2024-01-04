import React, { useState } from 'react';
import classes from './searchBar.module..css'; // Import the generated CSS file
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({setProductName, setSelectedPrices}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const options = [
    { value: {start:null, stop:99}, label:'below $100'},
    { value: {start:100, stop:199}, label: '$100-$199' },
    { value: {start:200, stop:299}, label: '$200-$299' },
    { value: {start:300, stop:399}, label: '$300-$399' },
    { value: {start:400, stop:499}, label: '$400-$499' },
    { value: {start:500, stop:599}, label: '$500-$599' },
    { value: {start:600, stop:699}, label: '$600-$699' },
    { value: {start:700, stop:799}, label: '$700-$799' },
    { value: {start:800, stop:899}, label: '$800-$899' },
    { value: {start:900, stop:999}, label: '$900-$999' },
    { value: {start:1000, stop:null}, label:'above $999'},
  ];
  const [unselectedOptions, setUnselectedOptions] = useState(options);
  // console.log(options)
  // console.log(unselectedOptions)

  const [selectedOptions, setSelectedOptions] = useState([]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '250px', 

      fontSize: '16px',
    }),
    menu: (provided) => ({
      ...provided,
      width: '250px',
      fontSize: '16px',
    }),
  };

  // Handle search term change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setProductName(e.target.value)
  };

  // Handle category change
  const handleCategoryChange = (selectedCategories) => {
    setSelectedOptions(selectedCategories);
    setSelectedPrices(selectedCategories)
    options.filter(
      (option) => !selectedCategories.some((selected) => selected.value === option.value)
    );
  };

  return (
    <div className="container p-4" style={{marginTop:'40px', paddingLeft:'40px'}}>
      <form className={classes.searchForm}>
        <div className="flex gap-5 flex-col sm:justify-evenly sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0">
          <div className='relative' style={{flexGrow:'1'}}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="p-2 border border-gray-300 rounded pl-10 w-3/4 sm:w-full"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-500" />
          </div>

          <div className='flex gap-5 items-center ite' style={{flexGrow:'2'}}>
            <div>
              <Select
                isMulti
                options={unselectedOptions}
                value={selectedOptions}
                onChange={handleCategoryChange}
                closeMenuOnSelect={false}
                // isSearchable={false}
                hideSelectedOptions={true} 
                placeholder="Price Range"
                styles={customStyles}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
import './header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import Dropdown from '../Menu/Dropdown';
import { useEffect, useState } from 'react';
import { GET_CATEGORIES } from '../../Constants/APIs';

const Header = ()=>{
    const autoHideHeaderList = [
        {id: "find_a_store", displayName: "Find a store"},
        {id: "buying_guides", displayName: "Buying guides"},
        {id: "contact_us", displayName: "Contact us"}
    ];
    const mainHeaderList = [
        {id: "select_your_pin_code" , displayName:"Select your Pin Code"}, 
        {id: "cart" , displayName: "Cart"}, 
        {id: "login" , displayName: "Login"}
    ];

    const [categories, setCategories] = useState([]);

    async function getAllCategories() {
        const response = await fetch(GET_CATEGORIES, {
            headers: {
                'projectID' : 'kbtsbbfdoig1',
            }
        });
        const data = await response.json();
        setCategories(data.data);
    }

    useEffect(()=>{
        getAllCategories();
    },[])
    return (
        <>
        <div className="autohideheader">
            <ul className='flex'>
                {
                    autoHideHeaderList.map(({id, displayName})=>{
                        return <li key={id}>{displayName}</li>
                    })
                }
            </ul>
        </div>
        <div className='header-main flex'>
            <Link to="/"><img className='headerlogo' src="https://www.reliancedigital.in/build/client/images/loaders/rd_logo.svg" alt="logo" /></Link>
            <Dropdown categories = {categories}/>
            <div className="search-box">
                <input className="search-input" type='text' placeholder='Find your favorite products'/>
                <SearchIcon className='searchIcon'/>
            </div>
            <ul className='flex'>
                {
                    mainHeaderList.map((listItem)=>{
                        if(listItem.displayName === "Cart") {
                            return <li className='flex'><ShoppingCartIcon className="headericon" key={listItem.id}/><span>{listItem.displayName}</span></li>
                        }
                        else if(listItem.displayName === "Login") {
                            return <li className='flex'><PersonIcon className="headericon" key={listItem.id}/><span>{listItem.displayName}</span></li>
                        }
                        else {
                            return <li key={listItem.id}>{listItem.displayName}</li>
                        }
                    })
                }
            </ul>
        </div>
        {/* <Navbar /> */}
        </>
    )
};

export default Header;
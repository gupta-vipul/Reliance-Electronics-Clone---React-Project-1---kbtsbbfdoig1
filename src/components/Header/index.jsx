import './header.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { GET_CATEGORIES, GET_SEARCH_DATA } from '../../Constants/APIs';
import { SearchContext } from '../../Context/SearchContext';
import { AuthContext } from '../../Context/AuthContext';
import Navbar from '../Navbar';
import Dropdown from '../Menu/Dropdown';

const Header = ()=>{
    const SearchInputRef = useRef();
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const {setSearchInputText} = useContext(SearchContext);
    const navigate = useNavigate();
    const autoHideHeaderList = [
        {
            id: uuidv4(),
            displayName: "Find a store",
            path: "/"
        },
        {
            id: uuidv4(),
            displayName: "Buying guides", 
            path: "/"
        },
        {
            id: uuidv4(), 
            displayName: "Contact us", 
            path: "/"
        },
    ];
    const mainHeaderList = [
        {
            id: uuidv4(), 
            displayName: "Select your Pin Code", 
            path: "/"
        }, 
        {
            id: uuidv4(), 
            displayName: "Cart", 
            path: "/cart"
        }, 
        {
            id: uuidv4(), 
            displayName: "Login", 
            path: "/login"
        },
        {
            id: uuidv4(),
            displayName: "Hi Vipul",
            path: "/profile/myaccount",
        }
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
        // console.log("Categories data =>",data.data);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(SearchInputRef.current.value !== "") {
            setSearchInputText(SearchInputRef.current.value);
        }
    }

    useEffect(()=>{
        SearchInputRef.current.focus();
        getAllCategories();
    },[])
    useEffect(()=>{
        if(localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    },[isLoggedIn])
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
            <Link to="/"><img className='headerlogo' src="/rd_logo.svg" alt="logo" /></Link>
            <Dropdown categories = {categories}/>
            <form className="search-box" onSubmit={handleSubmit}>
                <input ref={SearchInputRef} className="search-input" type='text' placeholder='Find your favorite products'/>
                <button type="submit" className="searchbtn"><SearchIcon className='searchIcon' /></button>
            </form>
            <ul className='flex'>
                <li><Link to="/">Select your Pin Code</Link></li>
                <li><Link to="/cart"><ShoppingCartIcon sx={{fontSize: '1.25rem', paddingRight: '5px'}}/>Cart</Link></li>
                {
                    isLoggedIn ? 
                    (<li><Link to="/profile/myaccount"><PersonIcon sx={{fontSize: '1.25rem', paddingRight: '5px'}}/>Hi Vipul</Link></li>) :
                    (<li><Link to="/login"><PersonIcon sx={{fontSize: '1.25rem', paddingRight: '5px'}}/>Login</Link></li>)
                }
            </ul>
            {/* <ul className='flex'>
                {
                    mainHeaderList.map((listItem)=>{
                        if(listItem.displayName === "Cart") {
                            return <li className='flex' key={listItem.id}><Link to={listItem.path}><ShoppingCartIcon className="headericon" /><span>{listItem.displayName}</span></Link></li>
                        }
                        else if(!isLoggedIn || listItem.displayName === "Login") {
                            return <li className='flex' key={listItem.id}><Link to={listItem.path}><PersonIcon className="headericon" /><span>{listItem.displayName}</span></Link></li>
                        }
                        else if(isLoggedIn && listItem.displayName === "Hi Vipul"){
                            return <li className='flex' key={listItem.id}><Link to={listItem.path}><PersonIcon className="headericon" /><span>{listItem.displayName}</span></Link></li>
                        }
                        else
                        {
                            return <li key={listItem.id}><Link to={listItem.path }>{listItem.displayName}</Link></li>
                        }
                    })
                }
            </ul> */}
        </div>
        {/* <Navbar /> */}
        </>
    )
};

export default Header;
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
import { CartContext } from '../../Context/CartContext';
import Navbar from '../Navbar';
import Dropdown from '../Menu/Dropdown';

const Header = ()=>{
    const SearchInputRef = useRef();
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const {setSearchInputText} = useContext(SearchContext);
    const {cartCount} = useContext(CartContext);
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
        }
    ];

    const [categories, setCategories] = useState([]);
    const [loginText, setLoginText] = useState("");
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

    function handleClick() {
        if(loginText === "Logout") {
            // console.log("Logout");
            localStorage.removeItem('token');
            navigate("/")
            setIsLoggedIn(false);
        }else {
            navigate("/login");
        }
    }
    
    useEffect(()=>{
        getAllCategories(); 
    },[])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        setLoginText(token ? 'Logout': 'Login')
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
                {
                    mainHeaderList.map((listItem)=>{
                        if(listItem.displayName === "Cart") {
                            return <li className='cart-icon-header flex' key={listItem.id}><Link to={listItem.path}><ShoppingCartIcon className="headericon" /><span>{listItem.displayName}{cartCount < 1 ? (null) : (<div className='cart-count-header'>{cartCount}</div>)}</span></Link></li>
                        }
                        else if(listItem.displayName === "Login") {
                            return <li className='flex' key={listItem.id} onClick={handleClick}><PersonIcon className="headericon" /><span>{loginText}</span></li>
                        }
                        else{
                            return <li key={listItem.id}><Link to={listItem.path }>{listItem.displayName}</Link></li>
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
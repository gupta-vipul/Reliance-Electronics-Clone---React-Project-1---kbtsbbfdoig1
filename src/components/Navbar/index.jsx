import { useEffect, useState } from 'react';
import './navbar.css';
import { GET_CATEGORIES } from '../../Constants/APIs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const Navbar =()=>{
    const [navlist, setNavlist] = useState([]);

    async function getAllCategories() {
        const response = await fetch(GET_CATEGORIES, {
            headers: {
                'projectID' : 'kbtsbbfdoig1',
            }
        });
        const data = await response.json();
        setNavlist(data.data);
    }

    useEffect(()=>{
        getAllCategories();
    },[]);
    return (
        <>
            <ul className='flex navbar'>
            {
                Array.isArray(navlist) &&
                navlist.map((listItem, index)=>{
                    if(listItem === 'ac'){
                        return <Link to={`categories/${listItem}`} key={index}><li className='nav-list-items flex'>air conditioners
                        {/* <ExpandMoreIcon style={{fontSize: '1rem'}}/> */}
                        </li></Link>
                    }
                    else if(listItem === 'tv'){
                        return <Link to={`categories/${listItem}`} key={index}><li className='nav-list-items flex'>televisions
                        {/* <ExpandMoreIcon style={{fontSize: '1rem'}}/> */}
                        </li></Link>
                    }
                    else if(listItem === 'kitchenappliances') {
                        return <Link to={`categories/${listItem}`} key={index}><li className='nav-list-items flex'>kitchen appliances
                        {/* <ExpandMoreIcon style={{fontSize: '1rem'}}/> */}
                        </li></Link>
                    }
                    else if(listItem === 'washingMachine') {
                        return <Link to={`categories/${listItem}`} key={index}><li className='nav-list-items flex'>washing machines
                        {/* <ExpandMoreIcon style={{fontSize: '1rem'}}/> */}
                        </li></Link>
                    }
                    else {
                        return <Link to={`categories/${listItem}`} key={index}><li className='nav-list-items flex'>{listItem}
                        {/* <ExpandMoreIcon style={{fontSize: '1rem'}}/> */}
                        </li></Link>
                    }
                    
                })
            }
            </ul>
        </>
    )
};

export default Navbar;
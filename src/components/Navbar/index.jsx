import { useEffect, useState } from 'react';
import './navbar.css';
import { GET_CATEGORIES } from '../../Constants/APIs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                navlist.map((listItem)=>{
                    return <li className='nav-list-items flex'>{listItem.toUpperCase()}<ExpandMoreIcon style={{fontSize: '1rem'}}/></li>
                })
            }
            </ul>
        </>
    )
};

export default Navbar;
import React from 'react';
import "../styles/navbar.css";
import { NavBarProps } from '../utils/types';

const NavBar: React.FC<NavBarProps> = ({ currentRegion, setCurrentRegion }) => {

    const handleClick = (region: string) => {
        setCurrentRegion(region);
    }

    return (
        <div className='nav'>
            <ul className='nav-list'>
                {['us-east', 'us-west', 'eu-west', 'eu-central', 'sa-east', 'ap-southeast'].map((region, index) => (
                    <li
                        key={index}
                        className={currentRegion === region ? 'active' : ''}
                        onClick={() => handleClick(region)}
                    >
                        {region}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavBar

import React from 'react'
import "../styles/panel.css";
import { SmallPanelProps } from '../utils/types';

const SmallPanel:React.FC<SmallPanelProps> = ({ name, value}) => {

    return (
        <div className='small-panel panel-box'>
            <p>{name} : { typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value ?? 'None') }</p>
        </div>
    )
}

export default SmallPanel;
import React from 'react';
import { LargePanelProps } from '../utils/types';

const LargePanel: React.FC<LargePanelProps> = ({ name, wait_time, workers, waiting, idle, time_to_return, recently_blocked_keys, top_keys }) => {
    return (
        <div className='large-panel panel-box'>
            <h1>{name}</h1>

                    <p>Wait time: {wait_time}</p>
                    <p>Waiting: {waiting}</p>
                    <p>Idle: {idle}</p>
                    <p>Time to return: {time_to_return}</p>
                    <p>Workers: {workers}</p>
                
            <div className='panel-grid'>

                <div className='display-panel-info'>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={3}>Recently Blocked Keys</th>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>Times Blocked</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                recently_blocked_keys.map((key:any, index) => (
                                    <tr key={index}>
                                        <td>{key[0]}</td>
                                        <td>{key[1]}</td>
                                        <td>{key[2]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className='display-panel-info'>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>Top Keys</th>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                top_keys.map((key:any, index) => (
                                    <tr key={index}>
                                        <td>{key[0]}</td>
                                        <td>{key[1]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}

export default LargePanel
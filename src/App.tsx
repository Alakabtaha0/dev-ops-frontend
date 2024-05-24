import React, { useEffect, useState } from 'react';
import "./styles/master.css";
import "./styles/panel.css";
import NavBar from './components/NavBar';
import useWebSocket from 'react-use-websocket';
import { Worker, Services } from './utils/types';
import SmallPanel from './components/SmallPanel';
import LargePanel from './components/LargePanel';

function App() {
	const [services, setServices] = useState<Services>({} as Services);
	const [workers, setWorkers] = useState<Worker>({} as Worker);
	const [region, setRegion] = useState<string>("");

	const { sendMessage, lastMessage } = useWebSocket('ws://upscope-api-7670fe37cc52.herokuapp.com/', {
		onOpen: () => console.log('opened'),
		onClose: () => console.log('closed'),
		onError: (error) => console.error('WebSocket error: ', error),
	});

	/**
	 * Effect hook that processes the last received WebSocket message.
	 * 
	 * When a new message is received, this effect parses the message data, updates the services
	 * and workers state, and conditionally updates the region state if it differs from the current region.
	 * 
	 * Dependencies:
	 * - `lastMessage`: The last message received from the WebSocket connection.
	*/
	useEffect(() => {
		if (lastMessage !== null) {
			const data = JSON.parse(lastMessage.data);
			setServices(data.services);
			setWorkers(data.worker);
			console.log(data.worker)
			if (data.services.region !== region) {
				setRegion(data.services.region);
			}
		}
	}, [lastMessage]);


	/**
	 * Effect hook that sends the current region to the WebSocket server when the region changes.
	 * 
	 * This effect sends the new region value to the WebSocket server whenever the `region` state changes in NavBar.
	 * 
	 * Dependencies:
	 * - `region`: The current region state.
	*/
	useEffect(() => {
		if (region !== "") sendMessage(region);
	}, [region]);


	return (
		<div className="set-page">
			<NavBar currentRegion={region} setCurrentRegion={setRegion} />
			<div className='panel-flex-settings small-panel-flex'>
				{
					services && Object.entries(services).map(([key, value]) => {
						return <SmallPanel name={key} value={value} />
					})
				}
			</div>
			<h1>Workers</h1>
			<div className='panel-flex-settings large-panel-flex'>
				{
					workers.name && <LargePanel
						name={workers.name}
						wait_time={workers.workerInformation.wait_time}
						workers={workers.workerInformation.workers}
						waiting={workers.workerInformation.waiting}
						idle={workers.workerInformation.idle}
						time_to_return={workers.workerInformation.time_to_return}
						recently_blocked_keys={workers.workerInformation.recently_blocked_keys}
						top_keys={workers.workerInformation.top_keys} />
				}
			</div>
		</div>
	);
}

export default App;

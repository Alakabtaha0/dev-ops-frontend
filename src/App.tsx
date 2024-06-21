import React, { useEffect, useState, useCallback } from 'react';
import "./styles/master.css";
import "./styles/panel.css";
import NavBar from './components/NavBar';
import useWebSocket from 'react-use-websocket';
import { Worker, Services } from './utils/types';
import SmallPanel from './components/SmallPanel';
import LargePanel from './components/LargePanel';

function App() {
	// const [services, setServices] = useState<Services>({} as Services);
	const [servicesArray, setServicesArray] = useState<Array<Services>>([]);
	// const [workers, setWorkers] = useState<Worker>({} as Worker);
	const [workersArray, setWorkersArray] = useState<Array<Worker>>([]);
	const [region, setRegion] = useState<string>("");
	const services = servicesArray[0] || {};

	const workers = workersArray.reduce((acc, val) => {
		console.log("acc", acc);
		console.log("val", val);
		
		return {
			name: val.name,
			workerInformation: {
				wait_time: Math.max(acc.workerInformation.wait_time, val.workerInformation.wait_time),
				workers: Math.max(val.workerInformation.workers),
				waiting: Math.max(val.workerInformation.waiting),
				idle: Math.max(val.workerInformation.idle),
				time_to_return: Math.max(val.workerInformation.time_to_return, acc.workerInformation.time_to_return),
				recently_blocked_keys: val.workerInformation.recently_blocked_keys,
				top_keys: val.workerInformation.top_keys
			}
		} 
	}, {
		name: "",
		workerInformation: {
			wait_time: 0,
			workers: 0,
			waiting: 0,
			idle: 0,
			time_to_return: 0,
			recently_blocked_keys: [],
			top_keys: []
		}
	} as Worker)


	const { sendMessage, lastMessage } = useWebSocket('wss://upscope-api-7670fe37cc52.herokuapp.com/', {
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
	const stableSendMessage = useCallback((message: any) => {
		sendMessage(message);
	}, [sendMessage]);

	useEffect(() => {
		if (lastMessage !== null) {
			const data = JSON.parse(lastMessage.data);
			const numberOfServers = data.services.serverCount;
			setServicesArray(services => [...services, data.services].slice(-5));

			console.log("number of servers", numberOfServers)
			setWorkersArray(workers => [...workers, data.worker].slice(-5));
			console.log(workersArray);
			console.log(data.worker);
			if (region === "") {
				setRegion(data.services.region);
			}
		}
	}, [lastMessage, region]);

	/**
	 * Effect hook that sends the current region to the WebSocket server when the region changes.
	 * 
	 * This effect sends the new region value to the WebSocket server whenever the `region` state changes in NavBar.
	 * 
	 * Dependencies:
	 * - `region`: The current region state.
	*/
	useEffect(() => {
		if (region !== "") stableSendMessage(region);
	}, [region, stableSendMessage]);


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

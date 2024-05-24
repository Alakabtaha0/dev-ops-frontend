// Component Props
export interface NavBarProps {
    currentRegion: string;
    setCurrentRegion: React.Dispatch<React.SetStateAction<string>>;
};

export interface SmallPanelProps {
    name: string;
    value: string | number | boolean | null;
}

export interface LargePanelProps extends WorkerInfo {
    name: string;
}

// Worker types
export type BlockedKeys = {
    id: string;
    number_of_times_blocked: number;
    date: string;
};

export type TopKeys = {
    id: string;
    floatNumber: number;
};

export type WorkerInfo = {
    idle: string;
    recently_blocked_keys: BlockedKeys[];
    time_to_return: number;
    top_keys: TopKeys[];
    wait_time: number;
    waiting: number;
    workers: number;
};

export interface Worker {
    name: string;
    workerInformation: WorkerInfo;
};


// Service types
export type Services = {
    activeConnections: number;
    cpuLoad: number;
    database: boolean;
    online: number;
    redis: boolean;
    region: string;
    serverCount: number;
    serverIssue: any | null;
    session: number;
    status: string;
    strict: boolean;
    timers: number;
    waitTime: number;
}
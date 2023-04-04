import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MediaRecord from './pages/MediaRecord'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import './assets/css/index.css';
import './assets/css/grid.css'
import './assets/css/theme.css'
import Doctor from './pages/Doctor';
import Patients from './pages/Patients';
import HearthBeat from './pages/HearthBeat';
import Analytics from './pages/Analytics';
import Pathogens from './pages/Pathogens';
import Hospitals from './pages/Hospitals';
import Statistics from './pages/Statistics';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="hearth_beat_iot" element={<HearthBeat />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="doctors" element={<Doctor />} />
                    <Route path="condition_rule"/>
                    {/* <Route path="pathogens" element={<Pathogens />} /> */}
                    <Route path="hospitals" element={<Hospitals />} />
                    <Route path="media_records" element={<MediaRecord />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="statictis" element={<Statistics />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
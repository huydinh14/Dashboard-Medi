import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import './assets/css/index.css';
import './assets/css/grid.css'
import './assets/css/theme.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="hearth_beat_iot" element={<Blank />} />
                    <Route path="patients" element={<Blank />} />
                    <Route path="doctors" element={<Blank />} />
                    <Route path="condition_rule" element={<Blank />} />
                    <Route path="pathogens" element={<Blank />} />
                    <Route path="hospitals" element={<Blank />} />
                    <Route path="media_records" element={<Blank />} />
                    <Route path="analytics" element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
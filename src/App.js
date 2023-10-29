import './App.css';
import { lazy, Suspense } from 'react';
import {Container} from "reactstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

const Home = lazy(() => import('./pages/Home'));
const GraphAlgorithms = lazy(() => import('./pages/GraphAlgorithms'));
const SortingAlgorithms = lazy(() => import('./pages/SortingAlgorithms'));

function App() {
    return (
        <div>
            <Container>
                <Navbar />
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<GraphAlgorithms />} />
                            <Route path="/graph-algorithm" element={<GraphAlgorithms />} />
                            <Route path="/sorting-algorithm" element={<SortingAlgorithms />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default App;

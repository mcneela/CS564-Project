import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import SingleJobPage from './components/SingleJobPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="jobs" element={<SingleJobPage />}>
        <Route path=":jobID" element={<SingleJobPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

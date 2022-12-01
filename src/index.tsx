import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ModelContext from './contexts/ModelContext';
import Model from './model';
import BeatPage, { beatLoader } from './pages/BeatPage';
import RootPage from './pages/RootPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
  },

  {
    path: "beat/:beatID",
        element: <BeatPage/>,
        loader: beatLoader
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModelContext.Provider value={new Model()}>
      <RouterProvider router={router} />
    </ModelContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

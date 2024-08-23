import React from "react";
import Home from "../pages/Home";
import { RouterProvider, createBrowserRouter, Routes, Route} from "react-router-dom"
import Admin from "../pages/Admin";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/admin",
    element: <Admin />
  }
])

function App() {
    return (
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    )
}

export default App

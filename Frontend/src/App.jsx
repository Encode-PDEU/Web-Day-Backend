import React from "react";
import Home from "../pages/Home";
import { RouterProvider, createBrowserRouter, Routes, Route} from "react-router-dom"
import Result from "../pages/Result";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/result",
    element: <Result />
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

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import NavBar from "./pages/NavBar";
import MovieLoader from "./loaders/MovieLoader";
const routes = [
  {
    path: "/",
    element: <NavBar />,
    loader: MovieLoader,
    hydrateFallbackElement: <p>Loading....</p>, // Parent route
  },
  {
    path: "/search", // This matches "/"
    element: <Search />, // This will render in the <Outlet /> of NavBar
  },
  {
    path: "/movie",
    element: <Movie />,
    hydrateFallbackElement: <p>Loading....</p>,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
    v7_skipActionStatusRevalidation: true,
  },
});

const App = () => {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};

export default App;

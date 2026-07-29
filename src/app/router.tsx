import { RootLayout } from "@layouts/RootLayout";
import { Home } from "@pages/Home";
import { Work } from "@pages/Work";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/work", element: <Work /> },
    ],
  },
]);

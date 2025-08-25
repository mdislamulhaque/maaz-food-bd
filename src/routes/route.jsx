import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import AllProducts from "../components/AllProducts";
import Home from "../components/Home";
import Cart from "../components/Cart";
import CheckOut from "../components/CheckOut";
import Track from "../components/Track";
import { AppProvider } from "../context/AppContext";
import About from "../components/About";
import PageWrapper from "../components/PageWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <MainLayout />
      </AppProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <AllProducts />,
      },
      {
        path: "/cart",
        element: (
          <PageWrapper>
            <Cart />
          </PageWrapper>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PageWrapper>
            <CheckOut />
          </PageWrapper>
        ),
      },
      {
        path: "/track",
        element: (
          <PageWrapper>
            <Track />
          </PageWrapper>
        ),
      },
      {
        path: "/:pageType",
        element: (
          <PageWrapper>
            <About />
          </PageWrapper>
        ),
      },
    ],
  },
]);

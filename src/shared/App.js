import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/navbar/Navbar";
import Wishlist from "./pages/wishlist/Wishlist";
import NoMatch from "./pages/noPage/NoMatch";
import CategoryText from "./components/text/CategoryText";
import NavBtn from "./utils/buttons_nav/NavBtn";
import "./styles.css";

export default function App({ serverData = null }) {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map(({ path, fetchInitialData, component: C }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <NavBtn />
                <C data={serverData} fetchInitialData={fetchInitialData} />
              </>
            }
          />
        ))}
        <Route
          path="/"
          element={
            <>
              <CategoryText /> <NavBtn />
            </>
          }
        />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

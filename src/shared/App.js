import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/navbar/Navbar";
import Wishlist from "./pages/wishlist/Wishlist";
import NoMatch from "./pages/noPage/NoMatch";
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
                <C
                  data={serverData}
                  fetchInitialData={() => fetchInitialData("movie")}
                />
                <C
                  data={serverData}
                  fetchInitialData={() => fetchInitialData("tv")}
                />
                <C
                  data={serverData}
                  fetchInitialData={() => fetchInitialData("person")}
                />
              </>
            }
          />
        ))}

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

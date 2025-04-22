import { Route, Routes } from "react-router-dom";
import MovieCard from "./components/card/MovieCard";
import SwiperCard from "./components/card/SwiperCard";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import SignUp from "./pages/SignUp";
import "./style/App.scss";

function App() {
  console.log('API URL: ', import.meta.env.VITE_BACKEND_API_BASE_URL);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <div>
              <SwiperCard />
              <MovieCard />
            </div>
          }
        ></Route>
        <Route path="/detail/:id" element={<MovieDetail />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;

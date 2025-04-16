import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import SwiperCard from "./components/SwiperCard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./style/App.scss";

function App() {
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

import "./style/App.scss";
import MovieCard from "./pages/MovieCard";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./components/Layout";
import SwiperCard from "./components/SwiperCard";
import Search from "./components/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

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
        <Route path="/search" element={<Search />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;

import "./style/App.scss";
import MovieCard from "./components/MovieCard";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import SwiperCard from "./components/SwiperCard";
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
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;

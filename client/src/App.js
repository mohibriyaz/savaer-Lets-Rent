import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookingcar from "./pages/Bookingcar";
import "antd/dist/antd.css";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route>
      <ProtectedRoute path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <ProtectedRoute path="/bookingcar" element={<Bookingcar/>} />

      </Route> */}
          <Route exact element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:carid" element={<Bookingcar />} />
            <Route path="/userbookings" element={<UserBookings />} />
            <Route path="/addcar" element={<AddCar />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/editcar/:carid" element={<EditCar />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// export function ProtectedRoute(props)
// {

//   if(loca)
//   {
//     return <Route {...props}/>
//   }
//   else{
//     return <Navigate to="/login"/>
//   }
// }

function ProtectedRoute() {
  const user = localStorage.getItem("user");
  const location = useLocation();
  return !user ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

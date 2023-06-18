// import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import Test from "./Test/Test";
import AdminRouter from "./Routes/AdminRouter";

import AuthLayout from "./Layouts/AuthLayout/AdminLayout";
// import Signup from "./Modules/Authentication/Signup/Signup";
import Signin from "./Modules/Authentication/Signin/Signin";
import InfoUser from "./Modules/InfoUser/InfoUser";
import ListUser from "./Modules/UserManagerment/ListUser/ListUser";
import AddUser from "./Modules/UserManagerment/AddUser/AddUser";

import RoomList from "./Modules/RoomManagement/RoomList/RoomList";
import Location from "./Modules/RoomManagement/Location/Location";
import Comment from "./Modules/Comment/Comment";

import BookingRoom from "./Modules/BookingRoom/BookingRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes > 
        <Route 
          path="/" 
          element={
            <AdminRouter>
              <AdminLayout/>
            </AdminRouter>
        }>
          <Route path="test" element={<Test/>} />
          <Route index element={<InfoUser/>} />
          <Route path="list-user" element={<ListUser/>} />
          <Route path="add-user" element={<AddUser/>} />
          <Route path="list-room" element={<RoomList/>} />
          <Route path="location" element={<Location/>} />
          <Route path="booking" element={<BookingRoom/>} />
          <Route path="comment" element={<Comment/>} />
          
        </Route>
        <Route path="/"  element={<AuthLayout/>}>
          <Route path="/signin" element={<Signin/>} />
          {/* <Route path="/signup" element={<Signup/>} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

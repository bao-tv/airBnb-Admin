import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import AdminRouter from "./Routes/AdminRouter";
import AuthLayout from "./Layouts/AuthLayout/AdminLayout";

// import Test from "./Test/Test";
// import Signup from "./Modules/Authentication/Signup/Signup";
// import Signin from "./Modules/Authentication/Signin/Signin";
// import InfoUser from "./Modules/InfoUser/InfoUser";
// import ListUser from "./Modules/UserManagerment/ListUser/ListUser";
// import AddUser from "./Modules/UserManagerment/AddUser/AddUser";

// import RoomList from "./Modules/RoomManagement/RoomList/RoomList";
// import Location from "./Modules/RoomManagement/Location/Location";
// import Comment from "./Modules/Comment/Comment";

// import BookingRoom from "./Modules/BookingRoom/BookingRoom";

// import Error from "./Components/Error/Error";

const Test = lazy(() => import("./Test/Test"));
const Signin = lazy(() => import("./Modules/Authentication/Signin/Signin"));
const InfoUser = lazy(() => import("./Modules/InfoUser/InfoUser"));
const ListUser = lazy(() => import("./Modules/UserManagerment/ListUser/ListUser"));
const AddUser = lazy(() => import("./Modules/UserManagerment/AddUser/AddUser"));
const RoomList = lazy(() => import("./Modules/RoomManagement/RoomList/RoomList"));
const Location = lazy(() => import("./Modules/RoomManagement/Location/Location"));
const Comment = lazy(() => import("./Modules/Comment/Comment"));
const BookingRoom = lazy(() => import("./Modules/BookingRoom/BookingRoom"));
const Error = lazy(() => import("./Components/Error/Error"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center">
          <img src="/iLoading.gif" class="img-fluid" alt="" />
        </div>
      }>
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
            <Route path="*" element={<Error/>} />

            
          </Route>
          <Route path="/"  element={<AuthLayout/>}>
            <Route path="/signin" element={<Signin/>} />
            {/* <Route path="/signup" element={<Signup/>} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

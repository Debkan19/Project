import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector.js';
import { Spinner } from './components/Spinner.js';
import ProtectedRoutes from './components/ProtectedRoutes.js';
import PublicRoutes from './components/PublicRoutes.js';
import ApplyDoctor from './pages/ApplyDoctor.js';
import NotificationPage from './pages/NotificationPage.js';
import Doctors from './pages/admin/Doctors.js';
import Users from './pages/admin/Users.js';
import Profile from './pages/doctor/Profile.js';
import BookingPage from './pages/BookingPage.js';
import Appointments from './pages/Appointments.js';
import DoctorAppointments from './pages/doctor/DoctorAppointments.js';
import UserProfile from './pages/UserProfile.js';

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
    <BrowserRouter>
    {loading ? (<Spinner />) : (
    <Routes>
       <Route path='/' element={
      <Home/>
    }/>
    <Route path='/dashboard' element={
    <ProtectedRoutes>
      <HomePage/>
    </ProtectedRoutes>
    }/>
    <Route path='/apply-doctor' element={
    <ProtectedRoutes>
      <ApplyDoctor/>
    </ProtectedRoutes>
    }/>
    <Route path='/appointments' element={
    <ProtectedRoutes>
      <Appointments/>
    </ProtectedRoutes>
    }/>
    <Route path='/doctor-appointments' element={
    <ProtectedRoutes>
      <DoctorAppointments/>
    </ProtectedRoutes>
    }/>
    <Route path='/profile' element={
    <ProtectedRoutes>
      <UserProfile/>
    </ProtectedRoutes>
    }/>
    <Route path='/notification' element={
    <ProtectedRoutes>
      <NotificationPage/>
    </ProtectedRoutes>
    }/>
    <Route path='/admin/doctors' element={
    <ProtectedRoutes>
      <Doctors/>
    </ProtectedRoutes>
    }/>
    <Route path='/doctor/profile/:id' element={
    <ProtectedRoutes>
      <Profile/>
    </ProtectedRoutes>
    }/>
    <Route path='/admin/users' element={
    <ProtectedRoutes>
      <Users/>
    </ProtectedRoutes>
    }/>
    <Route path='/doctor/book-appointment/:doctorId' element={
    <ProtectedRoutes>
      <BookingPage/>
    </ProtectedRoutes>
    }/>
    <Route path='/login' element={
    <PublicRoutes>
      <Login/>
    </PublicRoutes>}/>
    <Route path='/register' element={
    <PublicRoutes>
      <Register/>
      </PublicRoutes>}/>
    </Routes>)}
    
      </BrowserRouter>
    </>
  );
}

export default App;

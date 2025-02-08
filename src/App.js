import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpPage from './components/Auth/Signup';
import LandingPage from './pages/LandingPage';
import EventDetails from './components/EventDetails';
// import CreateEventForm from './pages/CreateEvent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/event/:id' element={< EventDetails/>} />
          {/* <Route path='/event/create_event' element={<CreateEventForm />} /> */}
          <Route path='/user/dashboard' element={<Dashboard />} />
          <Route path={"/auth/signin"} element={<LoginPage />} />
          <Route path={"/auth/signup"} element={<SignUpPage />} />

      </Routes>
    </div>
  );
}

export default App;

import GlobalStyle from "./styles/global";
import styled from "styled-components";
import UpdateForm from "./components/Form.js";
import Grid from "./components/Grid";
import Ccain from "./components/Ccain";
import Gtech from "./components/Gtech.js";
import Rover from "./components/Rover";
import StartUp from "./components/Startup.js";

import Cca from "./components/Cca";
// import ParentComponent from "./components/showForm";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AllUsers from "./components/AllUsers";
import Navbar from "./components/navbar";
import Login from "./login/Login";
import Register from "./register/Register";
import { AuthContext } from "./context/authContext";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  text-align: center;
  padding-top: 10px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.username > b.username ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  const Layout = () => {
    return (
      <>
        <Container>
          <Navbar />
          <Title>Admins</Title>
          <UpdateForm getUsers={getUsers} />
          <Grid users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <GlobalStyle />
      </>
    );
  };

  const CCA = () => {
    return (
      <>
        <Container>
          <Navbar />
          <Title>CCA POINTS</Title>
          <Ccain getUsers={getUsers} />

          <Cca users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <GlobalStyle />
      </>
    );
  };

  const Alluser = () => {
    return (
      <>
        <Container>
          <Navbar />
          <Title>All Users</Title>

          <AllUsers users={users} setUsers={setUsers} />
        </Container>

        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <GlobalStyle />
      </>
    );
  };

  const Gtechs = () => {
    return (
      <>
        <Container>
          <Navbar />
          <Title>GTech Members</Title>
          <Gtech users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer
          autoClose={30000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <GlobalStyle />
      </>
    );
  };
  const Rovers = () => {
    return (
      <>
        <Container>
          <Navbar />
          <Title>Rovers Members</Title>
          <Rover users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <GlobalStyle />
      </>
    );
  };
  const Startups = () => {
    return (
      <>
        <Container>
          <Navbar />
          <Title>Startup Members</Title>
          <StartUp users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <GlobalStyle />
      </>
    );
  };
  const Loginpage = () => {
    return (
      <>
        <Login />
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <GlobalStyle />
      </>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Loginpage />,
    },
    {
      path: "/users",
      element: <Alluser />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/cca",
      element: <CCA />,
    },
    {
      path: "/clubs/gtech",
      element: <Gtechs />,
    },
    {
      path: "/clubs/startup",
      element: <Startups />,
    },
    {
      path: "/clubs/rovers",
      element: <Rovers />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

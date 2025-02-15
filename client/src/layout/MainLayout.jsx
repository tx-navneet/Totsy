import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* 👈 This renders the matched child route */}
    </>
  );
}

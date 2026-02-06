import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";

import "./mainLayout.scss";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <div className="layout">
      <Header />

      <main className="layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

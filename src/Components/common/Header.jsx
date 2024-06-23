import home from "../../assets/icons/home.svg";
import notification from "../../assets/icons/notification.svg";
import logo from "../../assets/images/logo.svg";

import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useProfile } from "../../hooks/useProfile.js";
import Logout from "../auth/Logout";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user; // nullish coalising, taking user info from auth in homepage and from profile when in profile page

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* <!-- Logo --> */}
          <Link to="/">
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={logo}
            />
          </Link>
          {/* <!-- nav links  --> */}

          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-primary">
              <img src={home} alt="Home" />
              Home
            </Link>
            <button className="icon-btn">
              <img src={notification} alt="Notification" />
            </button>
            <Logout />

            <Link to="/me">
              <button className="flex-center !ml-8 gap-3">
                <span className="text-lg font-medium lg:text-xl">
                  {user?.firstName} {user?.lastName}
                </span>
                <img
                  className="max-h-[32px] rounded-full max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
                  alt=""
                />
              </button>
            </Link>
          </div>
          {/* <!-- nav links ends --> */}
        </div>
      </nav>
    </>
  );
}

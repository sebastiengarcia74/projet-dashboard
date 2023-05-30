import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

  const logout = ()=>{
    console.log('"logout"')
    Cookies.remove("_id")
    window.location.reload();
  }

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };
  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  useEffect(() => {
    setUserId(Cookies.get("_id"));
  }, [Cookies.get("_id")]);

  
  return (
    <div>
      <div className="navbar bg-base-100 flex ">
        <div className="flex-1 m-0 -translate-y-4">
          <Link href="/" className="btn btn-ghost m-0">
           <img className="w-20" src="https://res.cloudinary.com/dbivyjzla/image/upload/v1683209673/dash-1-logo-black-and-white_u3itoa.png" alt="logo" />
          </Link>
        </div>

        <div className="flex-none">
          {userId ?  (<button onClick={logout} className="btn mr-5">
                Logout
              </button>) : (
            <div>
              <button onClick={toggleLoginModal} className="btn mr-5">
                Login
              </button>
              <button onClick={toggleSignupModal} className="btn mr-1">
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Login
            onClose={closeLoginModal}
            toggleSignupModal={toggleSignupModal}
          />
        </div>
      )}
      {showSignupModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Signup
            onClose={closeSignupModal}
            toggleLoginModal={toggleLoginModal}
          />
        </div>
      )}
    </div>
  );
}

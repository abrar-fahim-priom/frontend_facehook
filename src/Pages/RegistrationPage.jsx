import { Link } from "react-router-dom";
import RegistrationForm from "../Components/auth/RegistrationForm";
import RegistrationLogo from "../assets/icons/registration.svg";

export default function RegistrationPage() {
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
        <div className="max-w-[1368px] flex-1">
          <div className="container grid items-center gap-8 lg:grid-cols-2">
            {/* <!-- illustration and title --> */}
            <div>
              {/* <!-- src="./assets/images/auth_illustration.png" --> */}
              <img
                className="mb-12 h-60"
                src={RegistrationLogo}
                alt="auth_illustration"
              />
              <div>
                <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                  Facehook
                </h1>
                <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                  Create a social media app with features like, showing the
                  post, post details, reactions, comments and profile.
                </p>
              </div>
            </div>
            {/* <!-- illustration and title ends --> */}
            {/* <!-- login form --> */}
            <div className="card">
              <RegistrationForm />

              <div className="py-4 lg:py-4">
                <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                  Already have an account?
                  <Link
                    className="hover:text-lwsGreen text-white transition-all hover:underline"
                    to="/"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            {/* <!-- login form ends --> */}
          </div>
        </div>
      </main>
    </div>
  );
}

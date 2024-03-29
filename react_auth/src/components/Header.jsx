import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center border-b-2 py-[16px] mobile:w-full">
      <div className="flex flex-1 justify-center items-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#C4C4C4" />
        </svg>
      </div>
      {location.pathname !== "/login" && (
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="border px-3 py-1 m-2 h-[40px] w-[98px] rounded-md border-login-border mobile:hidden"
        >
          Log in
        </button>
      )}
    </div>
  );
}

export default Header;

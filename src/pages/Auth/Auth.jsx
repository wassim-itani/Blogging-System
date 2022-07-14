import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { register, login } from "../../api/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, InputField, Notification } from "../../component/ui";
import "./Auth.scss";

const Auth = ({ type }) => {
  useDocumentTitle("Welcome! - BLOGR");

  const [user, dispatch] = useUserContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState({ error: "", loading: false });
  const [isVisible, setIsVisible] = useState(false);

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setStatus({ ...status, error: "Please fill all fields" });
      return;
    }

    const apiCall = type === "login" ? login : register;

    const auth = async () => {
      try {
        setStatus({ error: "", loading: true });

        const formData = new FormData();
        for (let key in credentials) {
          formData.append(key, credentials[key]);
        }
        const res = await apiCall(formData);
        const data = await res.json();
        setStatus({ ...status, loading: false });
        if (!res.ok) {
          throw new Error(data);
        }
        dispatch({ type: "AUTH_SUCCESS", payload: data });
      } catch (err) {
        if (err.name === "TypeError") {
          err.message = "Network Error";
        }
        setStatus({ ...status, error: err.message });
      }
    };
    auth();
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section className="user-action">
      <h1 className="user-action-title">Welcome to BLOGR</h1>
      {status.loading && <Notification type="success" message={"Loading..."} />}
      {status.error && <Notification type="error" message={status.error} />}
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-form-block">
          <InputField
            id="username"
            label="Username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleCredentials}
          />
        </div>
        <div className="user-form-block">
          <InputField
            id="password"
            label="Password"
            type={isVisible ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleCredentials}
          />
          {isVisible ? (
            <FaEye className="user-form-eye" onClick={toggleVisibility} />
          ) : (
            <FaEyeSlash className="user-form-eye" onClick={toggleVisibility} />
          )}
        </div>
        <Button
          text={type === "login" ? "Log in" : "Register"}
          type="filled"
          disabled={status.loading}
          onClick={handleSubmit}
        />
      </form>

      {type === "login" ? (
        <p className="user-action-footer">
          Don't have an account?{" "}
          <Link to="/register" className="user-action-link">
            Register here
          </Link>
        </p>
      ) : (
        <p className="user-action-footer">
          Already have an account?{" "}
          <Link to="/login" className="user-action-link">
            Login here
          </Link>
        </p>
      )}
    </section>
  );
};

export default Auth;

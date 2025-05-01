import { useState } from "react";
import { registerUser } from "../api/api"; 
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Swal from "sweetalert2";

const Register = () => {
  document.title = "COUNTRY HUB | Sign Up";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit User details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData); 
      Swal.fire({
        title: "Success!",
        text: "Registration successful!",
        icon: "success",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: 'w-[400px] bg-blue-700 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300'
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); 
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again!",
        customClass: {
          confirmButton: 'w-[400px] bg-blue-700 hover:bg-black text-white font-bold py-2 px-4 rounded-lg transition duration-300'
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://res.cloudinary.com/fmart/image/upload/v1745667064/CoverImg_pioxxg.jpg')] bg-cover bg-center bg-no-repeat pt-20 pb-20 mt-14">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-6">USER REGISTRATION</h2>
        <hr/><br/>
        <form onSubmit={handleSubmit}>
          <InputField label="Name" type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
          <InputField label="Address" type="text" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} />
          <InputField label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" type="password" name="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} />
          <Button text="Sign Up" type="submit" />
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-700 hover:text-black">Login</a>
        </p>
      </div><br/><br/><br/>
    </div>
  );
};

export default Register;

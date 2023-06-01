import React, {Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [checkPass, setCheckPass] = useState('');

  let navigate = useNavigate ();

    const handleSubmit = (e) => {  
      e.preventDefault();
      if(pass===checkPass){
          const data = {
              Ime: name,
              Email: email,
              Lozinka: pass
          };

          /*const url ='https://localhost:44357/api/Fin/Registration';
          axios.post(url, data).then((result)=>{
              alert(result.data);
              if(result.data === 'Унос успешан'){
                  navigate("/login");
              }
          }).catch((error)=>{
              setAlert(error);
              var x = document.getElementById("myDIVe");
              x.style.display = "block";
          })
      }else{
          setAlert("Лозинке се не поклапају");
          var x = document.getElementById("myDIVe");
          x.style.display = "block";
      }   */            
    }
  }

  return (
    <div className="grid grid-cols-1  h-screen w-full">
      <div className=" flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-300 p-8 px-8">
          <h2 className="text-4xl text-black-400 font-bold text-center ">
            SIGN UP
          </h2>
          <div className="flex flex-col text-black-400 py-2">
            <label>Name</label>
            <input
              value ={name} onChange ={(e) => setName(e.target.value)}
              className="rounded-lg  mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-black-400 py-2">
            <label>E-mail</label>
            <input
              value ={email} onChange ={(e) => setEmail(e.target.value)}
              className="rounded-lg  mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-black-400 py-2">
            <label>Password</label>
            <input
              value ={pass} onChange ={(e) => setPass(e.target.value)}
              className="p-2 rounded-lg mt-2 focus:border-blue-500  focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex flex-col text-black-400 py-2">
            <label>Confirm password</label>
            <input
              value ={checkPass} onChange ={(e) => setCheckPass(e.target.value)}
              className="rounded-lg  mt-2 p-2 focus:border-blue-500  focus:outline-none"
              type="text"
            />
          </div>
          <Link to="/calendar">
            <button className="w-full my-5 py-2 bg-purple-500 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg">
              SIGN UP
            </button>
          </Link>
          <div className="flex justify-center">
            <a href="/login" className="text-center underline">
              Already have an account? Log in!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

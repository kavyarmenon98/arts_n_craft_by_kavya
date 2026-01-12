    import { FaUser } from "react-icons/fa";
import { PiHandbagFill } from "react-icons/pi";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutAction } from "../redux/authSlice";
import './nav.css'

import { FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";
function Nav(){
    // let total = '0.00'
  const { user } = useSelector((state) => state.auth); // ✅ fixed
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(user,"user");

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/');
  };


    return(
        <>
        <div className="navbar flex justify-between p-2 " style={{backgroundColor:'#141414',color:'white'}}>
            <div className="flex"  style={{width : '140px'}}>
                <img src=" \src\assets\logo3.png" />
            </div>
            {user?.role=='admin' ? (

                <div className="flex  justify-between items-center mt-2 text-lg " style={{width : '960px'}}>
                    <div className="hover-box" ><Link to="/home" >Home</Link> </div>
                    <div className="hover-box">  <Link to="/addProduct" >Add Products</Link> </div>
                    <div className="hover-box">  <Link to="/listProduct" >List Products</Link> </div>
                    <div className="hover-box">  <Link to="/myorder" >Orders</Link> </div>

                   <div className="dropdown">
                        <span className="dropdown-title">Our Products</span>

                        <div className="dropdown-menu">
                            <Link to="/category/Nettipattam">Nettipattam</Link>
                            <Link to="/category/Resin">Resin Products</Link>
                            <Link to="/category/Painting">Paintings</Link>
                            <Link to="/category/Craft">Craft Items</Link>
                        </div>
                    </div> 
                    <div className="hover-box" ><Link to="/cart" >Cart</Link> </div>

                <div className="hover-box">About</div> 

                </div>
            ) : (
                <div className="flex  justify-between items-center mt-2 text-lg " style={{width:  '900px'}}>
                    <div className="hover-box" ><Link to="/home" >Home</Link> </div>
                  <div className="dropdown">
                        <span className="dropdown-title">Our Products</span>

                        <div className="dropdown-menu">
                            <Link to="/category/Nettipattam">Nettipattam</Link>
                            <Link to="/category/Resin">Resin Products</Link>
                            <Link to="/category/Painting">Paintings</Link>
                            <Link to="/category/Craft">Craft Items</Link>
                        </div>
                    </div>
                    <div className="hover-box" ><Link to="/cart" >Cart</Link> </div>
                    <div className="hover-box">  <Link to="/order" >Orders</Link> </div>

                    <div className="hover-box">About</div> 
                </div>
            )} 
                <nav>
                {user ? (
                    
                <button className="logout-btn  mr-5" onClick={handleLogout}>
                <FiLogOut size={20} /> {/* Icon */}
                </button>

                ) : (
                    <div className="flex gap-4">
                 
             
                    {/* <button
                        className="nav-icon-btn nav-icon-btn--blue"
                        onClick={() => navigate("/login")}
                        aria-label="Login"
                        title="Login"     // shows browser tooltip on hover
                    >
                        <FiLogIn size={19} aria-hidden="true" />
                    </button>

                    Register: icon-only */}
                    <button
                        className="nav-icon-btn nav-icon-btn--green mr-7"
                        onClick={() => navigate("/login")}
                        aria-label="Login"
                        title="Login"
                    >
                        <FiUserPlus size={21} aria-hidden="true" />
                    </button>

                    </div>
                )}
                </nav>
                {/* <div className="flex mt-2 justify-between items-center "  style={{width : '120px'}}>
                    <FaUser className="mt-1" />
                    <div className="font-bold">$ {total}</div>
                    <PiHandbagFill className="mt-1" />
                </div> */}

             
        </div>
        </>
    )
}
export default Nav
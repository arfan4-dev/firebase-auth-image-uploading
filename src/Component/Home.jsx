import './dashboard.css'
import { useNavigate } from 'react-router-dom'
const Home = () => { 
const navigate=useNavigate()
const getLogin=()=>{
	navigate('/login')
}
const getSignup=()=>{
	navigate('/signup')

}
  return (
    <div className="container">
	<span><button onClick={getLogin} className="button-30">
            <span className="button__text">Login</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
		  </span>
		  <span><button onClick={getSignup} className="button-30">
            <span className="button__text">Signup</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
		  </span>

</div>
  )
}

export default Home
import Button from "../../components/Button"
import homeSvg from '../../assets/images/svgs/home.svg'
import Header from '../Home/Header'
import { useNavigate } from "react-router-dom"

function NoGame({ text }) {
  
  const navigate = useNavigate();

  return (
    <>
      <Header/>
      <div className='d-flex flex-column' style={{ minHeight: '60vh' }}>
        <div className="mx-auto my-auto"><h3 className="fw-bold text-light text-center">
          {text}
        </h3>
          <div className="mt-4">
            <Button 
              className="mx-auto" 
              title="Back to home"
              icon={homeSvg}
              iconHeight='40vh'
              handleClick={()=>(navigate('/home'))}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default NoGame

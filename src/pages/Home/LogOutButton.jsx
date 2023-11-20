import Button from "../../components/Button"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase"
import successNotifier from "../../notifier/success"

function LogOutButton({ className }) {

  const logout = ()=>{
    signOut(auth).then(() => {
      successNotifier({message: "Successfully Log Out!"})
    }).catch((error) => {
      console.log(error.message)
    });
  }
  
  return (
    <Button
      handleClick={logout}
      text="Log Out"
      className={className}
      title="Log Out"
    />
  )
}

export default LogOutButton

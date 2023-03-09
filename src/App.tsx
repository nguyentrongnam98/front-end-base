import { useRoutes } from 'react-router-dom';
import { router } from './router';
import { useLogin } from './services/auth.service';

function App() {
  const content = useRoutes(router)
  const {mutate} = useLogin()
  const handleLogin = () => {
    mutate({
      username:'Sam',
      password:'1234'
    })
  }
  return (
    <div className="App">
     {content}
     <button onClick={handleLogin}>login</button>
    </div>
  )
}

export default App

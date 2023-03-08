import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { router } from './router'
import { transformRequest } from './services/base.service';
function App() {
  const content = useRoutes(router)
  useEffect(() => {
      const getData = async () => {
       const data = await transformRequest({
        url:'/todos',
        method:'get'
       })
       console.log('data',data);
       
      }
      getData()
  },[])
  return (
    <div className="App">
     {content}
     <div className='d-flex align-center gap-10'>
      <p>Nam</p>
      <p>Nguyen</p>
     </div>
    </div>
  )
}

export default App

import axios from "axios";
import { message } from "antd";


export const userLogin=(reqObj)=>async dispatch=>{

    dispatch ({type: 'LOADING', payload:true})

try{
    const response = await axios.post('/api/users/login' , reqObj)
    message.success('welcome')
    setTimeout(() => {
        window.location.href='/'
        
    }, 500);
    
    localStorage.setItem('user' , JSON.stringify(response.data))
    
    dispatch ({type: 'LOADING', payload:false})

} catch(error){
    console.log(error)
    message.error('oops! something went wrong')
    dispatch ({type: 'LOADING', payload:false})

}
}


export const userRegister=(reqObj)=>async dispatch=>{
    dispatch ({type: 'LOADING', payload:true})

try{
    const response = await axios.post('/api/users/register' , reqObj)
    message.success('welcome')
    setTimeout(() => {
        window.location.href='/login'
        
    }, 500);
    
    dispatch ({type: 'LOADING', payload:false})
    message.success('Registration Successful')

} catch(error){
    console.log(error)
    message.error('oops! something went wrong')
    dispatch ({type: 'LOADING', payload:false})

}
}
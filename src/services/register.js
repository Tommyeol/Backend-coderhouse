export default function register(credentials){
   return fetch('/api/auth/register', {
      method:'POST',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
   })
}

export function uploadAvatar(file, userId){
   const formdata = new FormData()
   formdata.append('avatar', file)
   
   return fetch(`/api/upload/${userId}`, {
      method:'POST',
      body: formdata
   })
}
 

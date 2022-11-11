export default function login(credentials){
   return fetch('/api/auth/login', {
      method:'POST',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
   })

}


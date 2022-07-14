const baseUrl='https://blogr99.000webhostapp.com/api/user';

const register=(credentials)=>fetch(`${baseUrl}/register.php`,{
    method:'POST',
    body:credentials
});

const login=(credentials)=>fetch(`${baseUrl}/login.php`,{
    method:'POST',
    body:credentials
});

export {register,login};
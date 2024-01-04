import Cookies from 'js-cookie'
import React from 'react'

const Profile = ({user}) => {

  const getCookie = (name) => {
    const cookie = Cookies.get(name)
    if(cookie){
      const token = cookie.split(';')[0];
      return token.substring(name.length+1);
    }
    return null;
  };
  
  const checkTokenExpiration = (name) => {
    const cookie = Cookies.get(name)
    if(cookie){
      const token = cookie.split(';')[1];
      const exp = token.substring("expires".length+1);
      const expirationDate = new Date(exp);
      console.log(expirationDate)
      console.log(new Date())
      return expirationDate > new Date();
    }
    return false;
  };

  return (
    <div className="shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[350px] sm:max-w-[550px] flex-col items-center bg-cover bg-clip-border p-[16px] rounded" style={{marginTop:"100px", boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
    <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover" style={{backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpsPJC2f4TkDGFjUUOEEHlIh2zMkw5DFlRynDeO3t02JI5lkJu_Dfjoy5BF8V5wbBjH4M&usqp=CAU")'}}>
        <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white border-[4px]">
            <img className="h-full w-full rounded-full" src={user ? user.image:"https://i.ibb.co/6YbS9ff/avatar11.png"} alt="" />
        </div>
    </div>
    <div className="mt-16 flex flex-col items-center">
        <h4 className="text-bluePrimary text-xl font-bold">{user.username}</h4>
        <p className="text-lightSecondary text-base font-normal">{user.firstName} {user.lastName}</p>
    </div>
    <div className="mt-6 mb-3 flex-col gap-4 md:!gap-14">
        <div className="flex gap-8 items-center justify-start">
        <p className="text-lightSecondary text-sm font-bold">Email</p>
        <h3 className="text-bluePrimary text-2sm font">{user.email}</h3>
        </div>
        <div className="flex gap-5 items-center justify-start">
        <p className="text-lightSecondary text-sm font-bold">Gender</p>
        <h3 className="text-bluePrimary text-2sm ">{user.gender}</h3>
        </div>
        <div className="flex gap-12 items-center justify-start">
        <p className="text-lightSecondary text-sm font-bold">ID</p>
        <h3 className="text-bluePrimary text-2sm ">{user.id}</h3>
        </div>
        <div className="flex gap-7 items-center justify- w-[300px]">
        <p className="text-lightSecondary text-sm font-bold">Token</p>
        <p className="text-bluePrimary text-sm font-normal" style={{overflowX:'scroll'}}>{checkTokenExpiration('currentUserToken') ?  getCookie('currentUserToken') : 'Token expired'}</p>
        </div>
    </div>
    </div>
  )
}

export default Profile
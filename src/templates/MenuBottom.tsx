/* eslint-disable @next/next/no-img-element */
import { Badge } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaStickyNote, FaReceipt } from 'react-icons/fa';

export const ImgPerfil = () => {
  const returnPhotoProfile = () => {
    return '/images/profile.png';
  }

  return (
    <div className="relative flex-shrink-0 w-10 h-10">
      <img
        className="absolute top-1 left-0 w-full h-full object-cover rounded-full shadow mr-3"
        src={returnPhotoProfile()}
        alt="foto perfil"
      />
    </div>
  )
};

const MenuItem = ({ item, isActive }) => (
  <Link href={item.path}>
    <div className={`px-3 flex flex-col items-center h-full justify-end ${isActive ? 'text-[#513585]' : 'text-gray-500'}`}>

      {item.icon}
      
      <span className={`text-sm mt-1 ${isActive ? 'border-b border-[#513585]' : ''}`}>
        {item.label}
      </span>
    </div>
  </Link>
);

export const MenuBottom = () => {
  const router = useRouter();

  const menuItems = [
    { label: "Início", icon: <FaHome className="w-6 h-6" />, path: "/" },
    // { label: "Notas", icon: <FaStickyNote className="w-6 h-6" />, path: "/notas" },
    // { label: "Canhoto", icon: <FaReceipt className="w-6 h-6" />, path: "/canhoto" },
    { label: "Perfil", icon: <ImgPerfil />, path: "/perfil" },
  ];

  const isActive = path => router.pathname === path || router.pathname === path + "/[slug]";

  return (
    <div className={`fixed bottom-0 w-full h-20 bg-white border-t border-gray-300 shadow-md`}>
      <div className="flex justify-around h-full pt-2 pb-5">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} isActive={isActive(item.path)} />
        ))}
      </div>
    </div>
  );
};

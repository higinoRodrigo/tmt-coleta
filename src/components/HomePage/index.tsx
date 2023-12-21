import { Button, Popconfirm, message } from 'antd'
import Image from 'next/image';
import { useRouter } from 'next/router';
import sloganTmt from "/public/images/logoTmt2.png";
import { ImgPerfil } from '@/templates/MenuBottom';
import Link from 'next/link';
import { ImExit } from "react-icons/im";

export const HomePage = ({session}) => {
  const router = useRouter()
  
  const confirm = () => {
    message.info('Saindo...');
    setTimeout(() => {
      message.destroy()
      router.push('/login')
    }, 1000);
  };
  
  return (
    <div className='pb-20'>
      <header className='flex flex-row relative w-full justify-between border-b mb-5'>
        <Popconfirm
          title="Deseja realmente sair?"
          onConfirm={confirm}
          okText="Sim, sair"
          cancelText="Não"
          placement="rightTop"
        >
          <div className='flex flex-col gap-1'>
            <ImExit className={`transform rotate-180 w-7 h-7`}/>
            <span className='pl-1'>Sair</span>
          </div>
        </Popconfirm>

        <div className='pl-3'>
          <Image
            className="w-40 -mt-2"
            src={sloganTmt}
            alt="logo"
            priority
          />
        </div>

        <Link href="/perfil">
          <div className='flex gap-2 flex-col items-center cursor-pointer'>
            <ImgPerfil />
            <span>Admin</span>
          </div>
        </Link>
      </header>

      <div className='flex flex-col items-start justify-start'>
        <h1 className='text-xl font-bold'>Bem-vindo(a)!</h1>
        <h2 className='text-lg'>
          Você informou um total de <span className='text-red-500'>0</span> dados até o momento.
        </h2>
      </div>


      <div className='flex items-center justify-center mt-10'>
        <Link href="/dados">
          <Button size='large' className='mt-5' type='primary'>Informar Dados</Button>
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center mt-10'>
        <h2>Último envio de dados</h2>
        <span>01/01/2023</span>
      </div>
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { AiOutlineCamera, AiOutlineLoading3Quarters } from 'react-icons/ai';
import type { UploadProps } from 'antd';
import Image from 'next/image';

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  
  reader.onload = () => {
    callback(reader.result);
    // Limpa os event listeners e a referência ao FileReader
    reader.onload = null;
    reader.onerror = null;
  };

  reader.onerror = () => {
    // Em caso de erro, também limpa os event listeners e a referência
    reader.onload = null;
    reader.onerror = null;
  };

  reader.readAsDataURL(img);
};

export const FotoMotorista = ({setFilePhoto, imageUrl, setImageUrl}) => {
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [isCropConfirmed, setIsCropConfirmed] = useState(false);

  const uploadButton = (
    <div className='flex flex-col items-center text-[1.8em]'>
      {loadingUrl ? <AiOutlineLoading3Quarters className='animate-spin' /> : <AiOutlineCamera />}
    </div>
  )

  const props: UploadProps = {
    name: "foto-motorista",
    listType: "picture-circle",
    className: "avatar-uploader",
    showUploadList: false,
    beforeUpload(file){
      const isIosImg = file.type === 'image/heic' || file.type === 'image/heif';
      const isAndroidImg = file.type === 'image/webp';
      const isPwaImg = file.type === 'image/apng';
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      const isValideImg = isIosImg || isAndroidImg || isPwaImg || isJpgOrPng;
  
      if (!isValideImg) {
        message.error('Você só pode fazer upload de arquivos de imagem!');
      }
      
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        message.error('Imagem muito grande, selecione outra imagem!');
      }
  
      return isJpgOrPng && isLt20M;
    },
    onChange(info){
      if (info.file.status === 'uploading') {
        setLoadingUrl(true);
        return;
      }
  
      if (info.file.status === 'done' && isCropConfirmed) {
        setLoadingUrl(false);

        getBase64(info.file.originFileObj, url => {
          setImageUrl(url);
        });
  
        setFilePhoto(info.file)
      }

      if(!isCropConfirmed){
        setLoadingUrl(false);
      }
    },
  }

  return (
    <div className='w-full text-center mb-2'>
      <ImgCrop
        rotationSlider
        modalTitle="Prévia foto"
        modalOk="Salvar"
        modalCancel="Cancelar"
        onModalOk={() => setIsCropConfirmed(true)}
        onModalCancel={() => setIsCropConfirmed(false)}
      >
        <Upload
          {...props}
        >
          {imageUrl ? (
            // <Image
            //   src={imageUrl}
            //   alt="foto motorista"
            //   width={200}
            //   height={200}
            //   style={{
            //     width: '100%',
            //     height: 'auto',
            //     borderRadius: '50%',
            //   }}
            // />
            <div className="relative flex-shrink-0 w-24 h-24">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover rounded-full shadow mr-3"
                src={imageUrl}
                alt="foto perfil"
              />
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
      <span className='text-[.6em]'>
        {
          loadingUrl ? '' : imageUrl ?
          'Toque na imagem para trocar a foto.' :
          'Toque no ícone para adicionar uma foto.'
        }
      </span>
    </div>
  )
}

import { Button, Upload, message } from "antd";
import type { UploadProps } from 'antd';
import { generateUUID } from "../../utils/functionsUtils";
import { AiOutlineLoading3Quarters, AiOutlineUpload } from "react-icons/ai";

export const UploadImg = ({
  setAnexo,
  setLoadingUrl,
  loadingUrl,
  nameUpload,
}) => {
  const propsUpload: UploadProps = {
    name: nameUpload,
    className: "avatar-uploader",
    showUploadList: false,
    action: '',
    beforeUpload(file){
      const isValidImageType = /image\/(jpeg|png|webp|apng|heic|heif)/.test(file.type);
      if (!isValidImageType) {
        message.error('Você só pode fazer upload de arquivos de imagem!');
        return false;
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Imagem muito grande, selecione outra imagem ou corte a imagem!');
        return false;
      }
  
      return false;
    },
    onChange(info){
      // if (info.file.status === 'uploading') {
      //   setLoadingUrl(true);
      //   return;
      // }
  
      // if (info.file.status === 'done') {
      //   compressImage(info.file.originFileObj, compressedFile => {
      //     const anexo = {
      //       uid: generateUUID(),
      //       file: compressedFile,
      //     }
      //     setAnexo(anexo);
      //     setLoadingUrl(false);
      //   });
      // }

      const isValidImageType = /image\/(jpeg|png|webp|apng|heic|heif)/.test(info.file.type);
      const isLt10M = info.file.size / 1024 / 1024 < 10;
  
      if (isValidImageType && isLt10M) {
        if (info.file.status === undefined) {
          setLoadingUrl(true);
          const anexo = {
            uid: generateUUID(),
            file: info.file,
          }
          setAnexo(anexo);
          setLoadingUrl(false);
        }
      }

      if (info.file.status === 'error') {
        message.error('Erro ao fazer upload da imagem!');
        setLoadingUrl(false);
      }
    },
    customRequest({ onSuccess }) {
      setTimeout(() => onSuccess("ok"), 0);
    },
  };

  const uploadButton = (
    <div className='flex flex-col items-center text-[1em]'>
      {loadingUrl ? <AiOutlineLoading3Quarters className='animate-spin' /> : <AiOutlineUpload />}
    </div>
  )

  return (
    <>
      <Upload {...propsUpload}>
        <Button size="middle" icon={uploadButton}>Selecione</Button>
      </Upload>
    </>
  )
}

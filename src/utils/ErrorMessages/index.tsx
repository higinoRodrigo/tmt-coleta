import React from "react";
import { Button, List } from "antd";
import { AiFillCaretRight, AiOutlineExclamationCircle } from "react-icons/ai";

const ErrorMessages = ({messages, onClearMessages}) => {
  const msgs = messages ? messages : [];

  if (msgs.length > 0) {
    return (
      <div className='flex items-center justify-center'>
        <div className="flex p-4 border rounded my-5">
          <List
            header={
              <div className="text-red-500 flex items-center justify-center flex-col">
                <AiOutlineExclamationCircle className="text-red-500" /> Erros durante
                processamento:
              </div>
            }
            footer={
              <div>
                <Button type="dashed" block onClick={onClearMessages}>
                  Limpar
                </Button>{" "}
              </div>
            }
            // bordered
            dataSource={msgs}
            renderItem={(item: string[]) => (
              <List.Item >
                <div className="flex flex-row items-center gap-2">
                  <AiFillCaretRight /> {item}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }

  return <></>;
};

export default ErrorMessages;

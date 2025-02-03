import React from "react";
import { Comment } from "src/types/Blog";

const ResponseCard: React.FC<Comment> = ({
  text,
  image,
  username,
  date,
  isAuthor,
}) => {
  return (
    <>
      <div className="flex justify-between border-b-2">
        <div className="flex flex-col">
          <div className="flex py-5 gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={image} alt="user" className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                <p>{username} </p>
                {isAuthor && (
                  <div>
                    <p className=" text-green-700 rounded-lg text-sm font-medium">
                      Author
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p>{date}</p>
              </div>
            </div>
          </div>
          <div className="mb-5">{text}</div>
          <div className="flex items-center gap-5 mb-4">
            <div>Clap</div>
            <div>Cloud</div>
            <div>Reply</div>
          </div>
        </div>
        <div>...</div>
      </div>
    </>
  );
};

export default ResponseCard;

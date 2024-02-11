import React from "react";
import { BoardButtonProps } from "./BoardButtonProps";

function BoardButton(props: BoardButtonProps) {
    const noImage = process.env.PUBLIC_URL + 'grunge-black-concrete-textured-background_53876-124541.avif';

    return (
        <span>
      {props.fileURL !== noImage ? (
          <div style={{ width: "150px", height: "150px", overflow: "hidden", margin: 0 }} id={props.id} onClick={props.onClick} className={props.className}>
              <img
                  src={props.fileURL as string}
                  alt="File"
                  style={{ width: "100%", height: "100%", objectFit: "cover", margin: 0 }}
              />
          </div>
      ) : (
          <input
              type="button"
              id={props.id}
              className={props.className}
              onClick={props.onClick}
              value={props.value}
              style={props.style}
          />
      )}
    </span>
    );
}

export default BoardButton;
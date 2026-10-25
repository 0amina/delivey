import { AiOutlineCloseSquare } from "react-icons/ai";
import Updatepack from "./updatepack";
function Edit(props) {
  const { setIsOpenEdit, dataId  } = props;
  if (!dataId) {
    return null;
  }
    return (
      <div
        onClick={setIsOpenEdit.bind(this, false)}
        style={{
          position: "fixed",
          background: "rgba(0,0,0,0.6)",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            left: 100,
            right: 50,
            position: "relative",
            background: "white",
            borderRadius: "8px",
            width: "1000px",
            height:"655px",
            padding: "20px 10px",
            animation: "dropTop .3s linear"
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}>
            
            <div onClick={setIsOpenEdit.bind(this, false)}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 10,
                right: 10
              }}
            >
              <AiOutlineCloseSquare />
            </div>
          </div>
          {/* Body */}
          <div>
            <p>
              <Updatepack  setIsOpenEdit={setIsOpenEdit} dataId= {dataId} ></Updatepack>
            </p>
          </div>
        </div>
      </div>
    );
  };
  export default Edit;
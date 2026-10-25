import { AiOutlineCloseSquare } from "react-icons/ai";
import { useEffect,useState } from "react";
function Added(props) {
  const { setIsOpenDel} = props;
  
  



  useEffect(() => {
    
  },[]);
    return (
        <div
        onClick={setIsOpenDel.bind(this, false)}
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
            position: "relative",
            background: "white",
            borderRadius: "8px",
            width: "250px",
            padding: "20px 10px",
            animation: "dropTop .3s linear"
          }}
        >
          {/* Header */}
          <div
          style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
        >
          <h1 style={{ margin: 0 }}>Added</h1>
          <div
            onClick={setIsOpenDel.bind(this, false)}
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
          <p>Your pack has been added succefully! </p>
          
          
        </div>
        {/* Footer */}
        
      </div>
    </div>
    );
  };
  export default Added;
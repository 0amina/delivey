import { AiOutlineCloseSquare } from "react-icons/ai";
import { useEffect,useState } from "react";
function Del(props) {
  const { setIsOpenDel, dataId } = props;
  const [deleted, setDeleted] = useState(false);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9006/api/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setDeleted(true);
		console.log('row deleted:')
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    setIsOpenDel(false);
  };

  const handleCancel = () => {
    setIsOpenDel(false); // Close the popup
  };

  useEffect(() => {
    
  },[deleted]);
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
          <h1 style={{ margin: 0 }}>Delete</h1>
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
          <p>are you sure u want to delete </p>
          <button onClick={() => {handleDelete(dataId);setIsOpenDel(false);}}> OK </button>
          <button onClick={handleCancel}> Cancel </button>
        </div>
        {/* Footer */}
        
      </div>
    </div>
    );
  };
  export default Del;
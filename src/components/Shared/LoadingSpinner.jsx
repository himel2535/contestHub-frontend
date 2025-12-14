// import { ScaleLoader } from "react-spinners";
import { Audio, RotatingLines } from "react-loader-spinner";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
     
      <RotatingLines
        visible={true}
        height="60"
        width="60"
        color="yellow"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      
    </div>
  );
};

export default LoadingSpinner;

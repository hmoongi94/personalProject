import { useRouter } from 'next/router';

interface exerciseDetailProps{
  name: string;
  imgurl: string;
  description: string;
}

const ExerciseDetailUI:React.FC<exerciseDetailProps>  = (exercisedetaildata) => {

  return (
    <div>
      <h1>Exercise Detail Page</h1>
      {/* <h2>{exercisedetaildata.imgurl}</h2> */}
      <h2>{exercisedetaildata.name}</h2>
      <h2>{exercisedetaildata.description}</h2>
    </div>
  );
};

export default ExerciseDetailUI;
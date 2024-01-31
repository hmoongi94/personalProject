import { useRouter } from 'next/router';

interface exerciseDetailProps{
  index: number;
  name: string;
  category: string;
  description: string;
  imgurl: string;
}

const ExerciseDetailUI:React.FC<exerciseDetailProps>  = (exercisedetaildata) => {

  return (
    <div>
      <h1>Exercise Detail Page</h1>
      <h1>exercisedetaildata.index</h1>
      <h1>exercisedetaildata.name</h1>
      <h1>exercisedetaildata.category</h1>
      <h1>exercisedetaildata.description</h1>
    </div>
  );
};

export default ExerciseDetailUI;
import React, {useEffect} from 'react';
import './home.css';
/*import { appContext } from '../../context/appContext';*/
import { HOC } from '../../App';

interface ContainerProps {
}

const HomePage: React.FC<ContainerProps> = () => {

  /*  const { getFindData  } = useContext(appContext)*/

  useEffect(() => {

    // eslint-disable-next-line
  }, []);



  return (
    <div style={{marginTop:'-1em'}}>
      <iframe src="https://newtonvisionco.com/"  width={'100%'} height={'1000px'} ></iframe>
    </div>
  );
};

export default HOC(HomePage);

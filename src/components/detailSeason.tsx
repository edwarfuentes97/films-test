import React, {useEffect} from 'react';
import './detailSeason.css';
import {HOC} from "../App";


interface ContainerProps {
		season: any
}



const detailSeason: React.FC<ContainerProps> = (season) => {
		/*  const { getFindData  } = useContext(appContext)*/

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
				console.log(season)
				// eslint-disable-next-line
		}, [season]);


		return (
				<>
						<div className={'main_container'}>
								{season.season}
						</div>
				</>
		);
};

export default detailSeason;

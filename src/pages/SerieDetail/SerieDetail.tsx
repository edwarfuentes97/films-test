import React, {useContext, useEffect, useState} from 'react';
import './SerieDetail.css';
import { appContext } from '../../context/appContext';
import { HOC } from '../../App';
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Jumbotron from "react-bootstrap/cjs/Jumbotron";

import Button from "react-bootstrap/cjs/Button";
import Card from "react-bootstrap/cjs/Card";





interface ContainerProps {
}

const SerieDetail: React.FC<ContainerProps> = () => {
  const location = useLocation();
  const [ paramId  , setParamId ] = useState()
  const [ tempNum  , setTempNum ] = useState()
  const {getSerieInfo , serieData , getCapsSerie , capsSeries} = useContext(appContext)
  /*  const [radioValue, setRadioValue] = useState('1');*/

  useEffect(() => {
    // @ts-ignore
    setParamId( location.state.id);
    console.log('myParams' , paramId)
    if (paramId){
      getSerieInfo(paramId);
      if (!tempNum) {
        getCapsSerie(paramId , 0);
      }
    }

    // eslint-disable-next-line
  }, [paramId]);

  useEffect( ()=>{
    // cambia cap
    if (tempNum && paramId){
      getCapsSerie(paramId , tempNum);
    }
    // eslint-disable-next-line
  }, [ tempNum])



  return (
    <>
      <div className={'container_series_info'}>
        {console.log(serieData)}
        {
          serieData ?
            <img  className={'serieImg'} src={ `https://image.tmdb.org/t/p/original${serieData.backdrop_path}`} alt="imagen" /> :<></>
        }
        <div className="">

          <div className="padding">
            <Jumbotron className={'custom_jumbo'}>
              <h3><b>{serieData.original_name}</b></h3>
            </Jumbotron>
          </div>
          <p className={'text_overview_serie'}>{serieData.overview}</p>

          <div className="padding">
            <Jumbotron className={'custom_jumbo'}>
              <h2>Temporadas</h2>
            </Jumbotron>
          </div>
          <Row>
            <Col>
              {
                serieData.seasons ?
                  serieData.seasons.map((element:any , index:number) => {
                    return(
                      <Button key={index} block variant="outline-dark" className={'btn_temp'} onClick={ ()=> setTempNum(index) }>{element.name}</Button>
                    )
                  })
                  : <></>
              }
            </Col>
          </Row>

          <br/>

          <div className="padding">
            <Jumbotron className={'custom_jumbo'}>
              <h3>Capitulos temporada {tempNum}</h3>
            </Jumbotron>
          </div>
          {
            capsSeries.episodes?.length > 0 ?
              capsSeries.episodes.map((element:any, index:number) => {
                return (
                  <Card style={{ width: '17%' , float:'left', margin:'1% 1%' , boxShadow:'1px 1px 6px black'}} key={index}>
                    <Card.Img variant="top" src={ `https://image.tmdb.org/t/p/original${element.still_path}`} />
                    <Card.Body>
                      <Card.Title> <b> {element.name} </b></Card.Title>
                      <Card.Text style={{textAlign:'left'}}>
                        {element.overview.substring(0,120)}...
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              }) :
              <></>
          }


        </div>
      </div>

    </>
  );
};

export default HOC(SerieDetail);

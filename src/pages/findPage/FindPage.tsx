import React, {useEffect, useContext, useState} from 'react';
import './FindPage.css';
import { appContext } from '../../context/appContext';
import { HOC } from '../../App';
import Card from "react-bootstrap/cjs/Card";
import Button from "react-bootstrap/cjs/Button";
import FormControl from "react-bootstrap/cjs/FormControl";
import Form from "react-bootstrap/cjs/Form";
import Alert from "react-bootstrap/cjs/Alert";
import Modal from "react-bootstrap/cjs/Modal";
import ListGroup from "react-bootstrap/cjs/ListGroup";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";


interface ContainerProps {

}


const FindPage: React.FC = () => {

  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClose = () => setShow(false);

  const { getFindData  , getFindDetailMovie , findDetailMovieData ,getActorsForMovie , actorsMovie  } = useContext(appContext)
  const [ key , setKey ]  = useState('')
  const [ update , setUpdate ] = useState(false)
  const [ alert , setAlert ] = useState(false)
  const [ datos, setDatos] = useState({
    key: ''
  })

  let [ vfrom, setVfrom] = useState(1)
  const [hits, setHits] = useState([]);

  useEffect(() => {
    if (key) getFindData(key, 1).then((data:any) => {
      if (data) setHits(data.results)
    })
    // eslint-disable-next-line
  }, [update]);


  const fetchMoreData = () => {

    console.log('fetchMoreData entra' , vfrom);
    setVfrom(vfrom++);

    getFindData(key, vfrom).then((data:any) => {
      console.log('data', data)
      if (data ){
        if (vfrom === 1){
          setHits(data.results)
          console.log('hits 1',  hits)
        }else{
          setHits(hits.concat(data.results))
          console.log('hits 2',  hits)
        }
      }
    })

  };

  const fnSumaVfrom = () => {
    setVfrom(vfrom++)
    console.log(vfrom);
    fetchMoreData();
  }

  const handleInputChange = (event:any) => {
    setAlert(false)
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }

  const enviarDatos = (event:any) => {
    event.preventDefault()
    setAlert(false)
    setKey(datos.key.replace(/[^a-zA-Z 0-9.]+/g,' '))
    setUpdate(!update)
    console.log('enviando datos...' + datos.key )
  }

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setAlert(true)
    }
  }

  const fnSeeMore = (id:string) => {
    setShow(true);
    if (id){
      getFindDetailMovie(id);
      getActorsForMovie(id);
    }
  }


  function fnDetail(id: string) {
    console.log('redireciona ?')
    history.push('/serieDetail',{id:id})
  }

  return (
    <>
      <Form inline>
        <FormControl  type="text" placeholder="Search" className="mr-sm-2 searchInput"
                      onChange={handleInputChange} onKeyDown={handleKeyDown}  name={'key'}  />
        <Button variant="outline-info" onClick={enviarDatos} >Search</Button>
      </Form>
      <hr/>
      {
        alert ?
          <Alert  variant={'dark'}> Enter disabled </Alert> :  <></>
      }

      {
        hits ?
          <InfiniteScroll
            dataLength={hits.length}
            next={fnSumaVfrom}
            hasMore={true}
            loader={<></>}
          >
            {
              hits.length > 0 ?
                hits.map( (element:any , index:number) => {
                  return (
                    <Card className={'cardStyle'} key={index}>
                      <Card.Img variant="top" src={ `https://image.tmdb.org/t/p/original${element.backdrop_path}`} />
                      <Card.Body>
                        { element.original_name ?
                          <Card.Title>{element.original_name}</Card.Title> :
                          <Card.Title>{element.original_title}</Card.Title>}

                        {
                          element.media_type === 'tv' ?
                            <Button size="sm" variant="outline-secondary" block onClick={ () => fnDetail( `${element.id}` ) }  > Ver más</Button> :
                            <Button size="sm" variant="outline-primary" onClick={ () => fnSeeMore( `${element.id}` ) }  block>Detalle</Button>
                        }
                      </Card.Body>
                    </Card>
                  )
                })
                :
                <p>No se encontraron resultados ...</p>
            }
          </InfiniteScroll>
          :
          <></>
      }

      <Modal show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          {
            findDetailMovieData.original_title ?
              <Modal.Title>{findDetailMovieData.original_title}</Modal.Title> :
              <Modal.Title>No se encontraron resultados</Modal.Title>
          }

        </Modal.Header>
        {
          findDetailMovieData.overview ?
            <>
              <Modal.Body>
                {findDetailMovieData.overview}
                <hr/>
                <h3>Reparto</h3>
                <ListGroup >
                  {
                    actorsMovie.cast?.length > 0 ?
                      actorsMovie.cast.map( (element:any , index:number) => {
                        return(
                          <ListGroup.Item key={index}><b> {element.character} </b> {element.name} </ListGroup.Item>
                        )
                      })
                      :
                      <> No se encontraron resultados...</>
                  }

                </ListGroup>
              </Modal.Body>
            </>
            :
            <Modal.Body><p>Descripción no disponible para tv show`s.</p></Modal.Body>
        }
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}> Aceptar </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};




export default HOC(FindPage);

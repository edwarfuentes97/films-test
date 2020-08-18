import { useState } from "react"

//Interface de respuesta del api para controlar acceso de datos al front

type response = {
    main: any
}

export interface IUseApi {
    fetchData: any,
    getFindData: (key:string , vfrom:number) => Promise<any>,
    getFindDetailMovie: (id:string) => void,
    getSerieInfo: (id:string) => void,
    getActorsForMovie: (id:string) => void,
    getCapsSerie: (id:string , capNumber:number) => void,
    actorsMovie:any,
    capsSeries: any,
    serieData: any,
    findDetailMovieData: any,
}




function useApi() {


    const [serieData, setSerieData] = useState([]);
    const [capsSeries, setCapsSeries] = useState([]);
    const [findDetailMovieData, setFindDetailMovie] = useState([]);
    const [actorsMovie, setActorsMovie] = useState([]);

    /**
     * Metodo para obtener datos del api por medio de fetch
     * Se puede implementar este metodo para que retorne una promesa y capturarla desde los metodos propios
     */

    const fetchData = async (url: string) => {
        return fetch(url)
          .then((response: any) => response.json())
          .catch(error => {
              console.error(error)
          });
    }



    /*Metodo  para obtener los resultados de  film*/
    const getFindData = (key:string , vfrom:number) => {
        console.log('pagina a  buscar  ***' , vfrom)
        return new Promise((resolve, reject) => {
            const url = `${process.env.REACT_APP_URL_FIND}multi?api_key=${process.env.REACT_APP_KEY_API}&language=es-ES&query=${key}&page=${vfrom}&include_adult=true`;
            fetch(url)
              .then((response: any) => response.json())
              .then((data: any) => {
                  resolve(data)
              }).catch(error => {
                reject(error);
            })
        });

    }

    /*Metodo  para obtener los resultados de  film en detalle*/
    const getFindDetailMovie = (id:string) => {
        const url = `${process.env.REACT_APP_URL_FIND_DETAIL}${id}?api_key=${process.env.REACT_APP_KEY_API}&language=es-ES`;
        fetchData(url).then((data:any) => {
            if (data) {
                setFindDetailMovie(data)
            }
        })
    }

    /*Metodo  para obtener los resultados de  actores film en detalle*/
    const getActorsForMovie = (id:string) => {
        const url = `${process.env.REACT_APP_URL_FIND_DETAIL}${id}/casts?api_key=${process.env.REACT_APP_KEY_API}&language=es-ES`;
        fetchData(url).then((data:any) => {
            if (data) {
                setActorsMovie(data)
            }
        })
    }

    /*Metodo  para obtener los resultados detalle de series*/
    const getSerieInfo = (id:string) => {
        const url = `${process.env.REACT_APP_URL_SERIE}${id}?api_key=${process.env.REACT_APP_KEY_API}&language=es-ES`;
        console.log(url)
        fetchData(url).then((data:any) => {
            if (data) {
                setSerieData(data)
            }
        })
    }

    /*Metodo  para obtener los capitulos de las series*/
    const getCapsSerie = (id:string , capNumber:any) => {
        const url = `${process.env.REACT_APP_URL_SERIE}${id}/season/${capNumber}?api_key=${process.env.REACT_APP_KEY_API}&language=es-ES`;
        fetchData(url).then((data:any) => {
            if (data) {
                setCapsSeries(data)
            }
        })
    }





    return {
        fetchData,
        getFindData,
        getFindDetailMovie,
        capsSeries,
        findDetailMovieData,
        getActorsForMovie,
        getCapsSerie,
        actorsMovie,
        getSerieInfo,
        serieData
    }
}

export {
    useApi
}

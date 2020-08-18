import React from 'react'
import { IUseApi } from '../hooks/useApi';



const apiHook: IUseApi = {
    fetchData : () => {},
    getFindData:(key) => new Promise<any>(() => {}) ,
    getFindDetailMovie:(id) => {},
    getActorsForMovie:(id) => {},
    findDetailMovieData: [],
    actorsMovie:[],
    getSerieInfo:(id:string) => {},
    getCapsSerie:(id:string , CapNumber:number) => {},
    serieData:[],
    capsSeries:[]
}

export const appContext =  React.createContext({ ...apiHook});

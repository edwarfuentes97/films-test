import React from 'react';
import './App.css';
import { WithContext } from './context/withContext';
import AppRouter from "./routers/AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';


import './styles/styles.scss'

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}




interface HOCP {
  state: boolean;
  callBack: () => void;
}

export function HOC(Component: React.FC<HOCP>)  {
  function rederizate(props: any) {
    return (
      <Component state={false} callBack={() => {}} />
    )
  }
  return rederizate;
}


export default WithContext(App);

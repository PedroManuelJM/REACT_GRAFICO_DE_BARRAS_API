import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend , CategoryScale, LinearScale,BarElement} from 'chart.js';
import { Bar} from 'react-chartjs-2';

ChartJs.register(
  //Tooltip, Title, ArcElement, Legend
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {

const [paises, setPaises] = useState([]);  
const [esperanza, setEsperanza]=useState([]);
  
const data = {
  datasets: [
  {
      label: 'MAX. EDAD DE ESPERANZA DE VIDA',
      data: esperanza,
      backgroundColor:'rgba(0,255,0,1)',
      borderColor:'black',
      borderWidth:1,
      hoverBackgroundColor:'rgba(0,255,0,2)',
      hoverBorderColor:'#FF0000',
  },
],
labels:paises,
}

const opciones={
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
    responsive:true,
    plugins: {
        title: {
          display: true,
          text: 'ESPERANZA DE VIDA',
        },
      },
}

const PeticionAPI= async () => {
  const rutaServicio ="https://pedromanueljm.github.io/api_esperanzavida/data.json";
  fetch(rutaServicio)
  .then( res => res.json() )
     .then(
            (result) => {
                  let respuesta = result;
                  let pais= [], esperanza=[];
                  respuesta.map(elemento => {
                    pais.push(elemento.pais)
                    esperanza.push(elemento.esperanza)
                  });
                  setPaises(pais);
                  setEsperanza(esperanza);
            
              
            }
          )
};

useEffect(()=> {
  PeticionAPI();

 }, [])


  return (
    <div className="App">
      <h3 style={{textAlign:"center"}}> USANDO DATOS DE UNA API</h3>
      <Bar data={data} options={opciones} />
    </div>
  );
}

export default App;

import { ref } from 'vue'
import axios from "axios";

// TODO Extract interfaces in a separate folder
interface ICircuit {
  id: number;
  name: string;
  installation_date: string;
  created_at: string;
  meter_id: number;
  circuit_id: number;
  is_main: boolean
}

interface ICircuits {
  circuits: ICircuit[];
  circuit: ICircuit;
  getCircuit: (id: number) => Promise<ICircuit>;
  getCircuits: () => Promise<ICircuit[]>;
  createCircuit: (data: any) => Promise<ICircuit>;
  updateCircuit: (id: any, data: any) => Promise<ICircuit>;
  deleteCircuit: (id: number) => Promise<ICircuit>;
}

export default function useCircuits(): ICircuits {
  const circuits = ref<ICircuit[]>([])
  const circuit = ref<ICircuit>({} as ICircuit)

  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_CORE_API_URL}`

  const getCircuits = async (): Promise<ICircuit[]> => {
    const response = await axios.get('/circuits');
    circuits.value = response.data;
    return response.data;
  }

  const getCircuit = async (id: number): Promise<ICircuit> => {
    let response = await axios.get('/circuits/' + id)

    return circuit.value = response.data;
  }

  const createCircuit = async (data: any): Promise<ICircuit> => {
    let response = await axios.post('/circuits', data)
    return response.data
  }

  const updateCircuit = async (id: number, data: any): Promise<ICircuit> => {
    let response = await axios.put('/circuits/' + circuit.value.id, data)
    return response.data;
  }

  const deleteCircuit = async (id: number): Promise<ICircuit> => {
    const response = await axios.delete('/circuits/' + id)
    return response.data;
  }

  return {
    circuits,
    circuit,
    getCircuit,
    getCircuits,
    createCircuit,
    updateCircuit,
    deleteCircuit
  }
}



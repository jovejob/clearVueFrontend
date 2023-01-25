import { ref } from 'vue'
import axios from "axios";

// TODO Extract interfaces in a separate folder
interface IMeter {
  id: number;
  siteId: number;
  serial_number: string;
  installation_date: string;
  created_at: string;
  updated_at: string
}

interface IMeters {
  meters: IMeter[];
  meter: IMeter;
  getMeter: (id: number) => Promise<IMeter>;
  getMeters: () => Promise<IMeter[]>;
}

export default function useMeters(): IMeters {
  const meters = ref<IMeter[]>([])
  const meter = ref<IMeter>({} as IMeter)

  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_CORE_API_URL}`

  const getMeters = async (): Promise<IMeter[]> => {
    const response = await axios.get('/meters');
    meters.value = response.data;
    return response.data;
  }

  const getMeter = async (id: number): Promise<IMeter> => {
    let response = await axios.get('/meters/' + id)
    return meter.value = response.data;
  }

  return {
    meters,
    meter,
    getMeter,
    getMeters
  }
}


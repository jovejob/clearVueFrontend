import { ref } from 'vue'
import axios from "axios";
import { DateTime } from 'luxon'

// TODO Extract interfaces in a separate folder
interface Circuit {
  id: number;
  meterId: number;
  circuitId: number;
  name: string;
  installation_date: DateTime;
  is_main: boolean;
  created_at: DateTime;
  meter: Meter;
  subCircuits: Circuit[];
}

interface Customer {
  id: number
  name: string
  email: string
  vat_number: string
  createdAt: DateTime
  updatedAt: DateTime
  sites: ISite[]
}

interface Meter {
  id: number
  siteId: number
  serial_number: string
  installation_date: DateTime
  circuits: Circuit[]
  site: ISite
}

interface ISite {
  id: number
  customerId: number
  name: string
  coordinates: string
  address: string
  post_code: string
  createdAt: DateTime
  updatedAt: DateTime
  customer: Customer
  meters: Meter[]
}

interface IISites {
  sites: ISite[];
  site: ISite;
  getSite: (id: number) => Promise<ISite>;
  getSites: () => Promise<ISite[]>;
}

export default function useSites(): IISites {
  const sites = ref<ISite[]>([])
  const site = ref<ISite>({} as ISite)

  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_CORE_API_URL}`

  const getSites = async (): Promise<ISite[]> => {
    const response = await axios.get('/sites');
    sites.value = response.data;
    return response.data;
  }

  const getSite = async (id: number): Promise<ISite> => {
    let response = await axios.get('/sites/' + id)
    return site.value = response.data;
  }

  return {
    sites,
    site,
    getSite,
    getSites
  }
}


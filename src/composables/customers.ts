import { ref } from 'vue'
import axios from "axios";

// TODO Extract interfaces in a separate folder
interface ICustomer {
  id: number;
  name: string;
  email: string;
  vat_number: string;
}

interface ICustomers {
  customers: ICustomer[];
  customer: ICustomer;
  getCustomer: (id: number) => Promise<void>;
  getCustomers: () => Promise<ICustomer[]>;
  createCustomer: (data: any) => Promise<ICustomer>;
  updateCustomer: (id: any, data: any) => Promise<ICustomer>;
  deleteCustomer: (id: number) => Promise<ICustomer>;
}

export default function useCustomers(): ICustomers {
  const customers = ref<ICustomer[]>([])
  const customer = ref<ICustomer>({} as ICustomer)

  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_CORE_API_URL}`

  const getCustomers = async (): Promise<ICustomer[]> => {
    const response = await axios.get('/customers');
    customers.value = response.data;
    return response.data;
  }

  const getCustomer = async (id: number): Promise<void> => {
    let response = await axios.get('/customers/' + id)
    return customer.value = response.data;
  }

  const createCustomer = async (data: any): Promise<ICustomer> => {
    let response = await axios.post('/customers', data)
    return response.data
  }

  const updateCustomer = async (id: number, data: any): Promise<ICustomer> => {
    let response = await axios.put('/customers/' + customer.value.id, data)
    return response.data;
  }


  const deleteCustomer = async (id: number): Promise<ICustomer> => {
    const response = await axios.delete('/customers/' + id)
    return response.data;
  }

  return {
    customers,
    customer,
    getCustomer,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
  }
}



// import { ref } from 'vue'
// import axios from "axios";

// export default function useCustomers() {
//     const customers = ref([])
//     const customer = ref([])
//     axios.defaults.baseURL = `${import.meta.env.VITE_BASE_CORE_API_URL}`

//     const getCustomers = async () => {
//       const response = await axios.get('/circuits');
//       return customers.value = response.data;
//     }

//     const getCustomer = async (id: number) => {
//       let response = await axios.get('/circuits/' + id)
//       customer.value = response.data;
//     }

//     return {
//         customers,
//         customer,
//         getCustomer,
//         getCustomers
//     }
// }
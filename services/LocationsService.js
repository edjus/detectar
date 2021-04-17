import { BACKEND_URL } from '@env'
import axios from 'axios'

const get = async (filters) => {
    const response = await axios.get(`${BACKEND_URL}/operatives`, {
        params: {
            comuna: filters.comuna
        }
    })

    return response.data.map(o => { 
        return {
            id: o.id,
            title: o.lugar,
            address: o.direccion,
            comuna: o.comuna,
            coords: {
                latitude: parseFloat(o.y),
                longitude: parseFloat(o.x)
            }
        }
    })
}

export {
    get
}
import { BACKEND_URL } from '@env'
import axios from 'axios'

const get = async (filters) => {
    const url = `${BACKEND_URL}/operatives`

    const response = await axios.get(url, {
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
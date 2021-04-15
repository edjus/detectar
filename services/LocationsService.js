const coords = (lat, long) => {
    return {
        latitude: lat,
        longitude: long
    }
}

const marker = (title, description, lat, long) => {
    return {
        title,
        description,
        coords: coords(lat, long)
    }
}

const get = async () => {
    return Promise.resolve([
        marker('Casa Bonita', 'Dirección: Casa Bonita 1234', -34.604179, -58.446780),
        marker('Centro Médico', 'Dirección: Centro Médico 321', -34.617792, -58.425814),
        marker('Un Título', 'Dirección: Una Dirección', -34.597869, -58.418893)
    ])
}

export {
    get
}
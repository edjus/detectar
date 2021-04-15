const coords = (lat, long) => {
    return {
        latitude: lat,
        longitude: long
    }
}

const get = async () => {
    return Promise.resolve([
        coords(-34.604179, -58.446780),
        coords(-34.617792, -58.425814),
        coords(-34.597869, -58.418893)
    ])
}

export {
    get
}
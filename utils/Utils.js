import Toast from 'react-native-toast-message';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c / 1000; //distance in km
}

const showToastMessage = (type, title, description, position) => {
  Toast.show({
    text1: title,
    text2: description,
    position: position,
    type: type,
    visibilityTime: 4000,
    autoHide: true,
  });
}

export {
  calculateDistance,
  showToastMessage
}

export function getUserPosition() {
    return new Promise((resolve, reject)=> {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=> {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                ()=> {
                    console.log('Cant get the actual position')
                    resolve({
                        latitude: 40.7128,
                        longitude: -74.0060,
                    })
                    reject('Geolocation failed');
                }
            )
        }else{
            reject('Geolocation not supported');
        }
    })
}
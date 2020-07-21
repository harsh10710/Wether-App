window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescreption=document.querySelector('.temperature-descreption');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');
    let temperatureSection=document.querySelector('.temperature-section');
    const temperatureSpan=document.querySelector('.temperature-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy='https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            fetch(api).then(data=>data.json()).then(data=>{
                const {temperature,summary,icon}=data.currently;
                temperatureDegree.textContent=temperature;
                temperatureDescreption.textContent=summary;
                locationTimezone.textContent=data.timezone;
                setIcon(icon,document.querySelector('.icon'));

                let celsius=(temperature-32)*(5/9);
               
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent==='F'){
                        temperatureSpan.textContent='C';
                        temperatureDegree.textContent=Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent='F';
                        temperatureDegree.textContent=temperature;
                    }
                })

            });
        });
    }


    function setIcon(icon,iconID){
        const skycons=new Skycons({color:"white"})
        const currentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);

    }
 

});
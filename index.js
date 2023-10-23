const usertab=document.querySelector('[data-usertab]');
const searchtab=document.querySelector("[data-searchtab]");
const grantaccess=document.querySelector("[data-grantaccess]")
const loadingstate=document.querySelector("[data-loadingstate]")
const weatherinfo=document.querySelector("[data-weatherinfo]")
const weatherinputinfo=document.querySelector("[data-weatherinputinfo]")
const grantbutton=document.querySelector('.grant-access')
const errorpage=document.querySelector('.errorpage');
console.log(weatherinfo)
console.log(weatherinputinfo)
const Apikey="8b1edb699002e748e97cef71788e6ba3";
let currenttab=usertab;
getlocalinfo();


// function addactiveclass(){
//     if(!currenttab.classList.contains('active')){

//     }
// loadingstate.classList.add('active');
// weatherinfo.classList.add('active');
// weatherinputinfo.classList.add('active');
// }
// addactiveclass();



























// user weather info---weather info
async function  userweatherapicall(localcoords){
    const{lat,lon}=localcoords;
    loadingstate.classList.add('active');
    grantaccess.classList.remove('active');
    try{
     let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Apikey}&units=metric`);
     let data=await response.json();
     
    //  loadingstate.classList.remove('active');
    //  weatherinfo.classList.add('active');
    //  localStorage.setItem("let",x);
    //  localStorage.setItem('lon',y);
    //  console.log(localStorage)
    console.log("1");
    showdataonscreen(data)
    loadingstate.classList.remove("active");
    weatherinfo.classList.add("active");
    console.log("why it is nt d",weatherinfo);
 
      
    }
 catch(err){
     console.log(err)
 }
 
 }
//  showdataonscreen---weatheruserinfo
function showdataonscreen(data){
    // console.log("2");
    const cityname=document.querySelector('[data-cityname]');
    // console.log(cityname);
    
    const flag=document.querySelector('[data-flagicon]');
    const des=document.querySelector('[data-weatherdes]');
    const weathericon=document.querySelector('[data-weathericon]');
    const degreesvalue=document.querySelector('[data-degreesvalue]');
    // const windpeedicon=document.querySelector('[ data-windspeedicon]');
    const windspeedvalue=document.querySelector('[ data-windspeedvalue]');
    // const humidityicon=document.querySelector('[data-humidityicon]');
    const humidityvalue=document.querySelector('[data-humidityvalue]');
    // const cloudicon=document.querySelector('[data-cloudicon]');
    const cloudvalue=document.querySelector('[data-cloudvalue]');
   
   
    cityname.textContent=data?.name;
   
    flag.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`
    des.textContent=data?.weather[0]?.description;
    // 
    weathericon.src=`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`;
    degreesvalue.textContent=`${data?.main?.temp} °C`
    windspeedvalue.textContent=`${data?.wind?.speed}m/s`;
    humidityvalue.textContent=`${data?.main?.humidity}%`;
    cloudvalue.textContent=`${data?.clouds?.all}%`;


}

 // we're getting localstorage info here
function getlocalinfo(){
    let localcoords=sessionStorage.getItem('user-coords');
    if(!localcoords){
        grantaccess.classList.add('active');

    }
    else{
        // console.log(localcoords)
        localcoords=JSON.parse(localcoords);
        // console.log(localcoords)
        userweatherapicall(localcoords)


    }
}
function switchtab(clickedtab){
    if(currenttab!=clickedtab){
        currenttab.classList.remove('back-color');
        currenttab=clickedtab;
        currenttab.classList.add('back-color');
        if(!weatherinputinfo.classList.contains('active')){
            // loadingstate.classList.remove('active');
            weatherinfo.classList.remove('active');
            grantaccess.classList.remove('active');
            loadingstate.classList.add("active")
            setTimeout(()=>{
                loadingstate.classList.remove("active")
                weatherinputinfo.classList.add('active');
            },1000);
            
            
            
        }
        else{
            errorpage.classList.remove('active');
            weatherinputinfo.classList.remove('active');
            weatherinfo.classList.remove('active');
            getlocalinfo();

            

        }

    }

   
}
const geotext2=document.querySelector('.text2');

function showPosition(position) {
  
   const usercoordinates={
    lat:position.coords.latitude,
    lon:position.coords.longitude

   }
   sessionStorage.setItem("user-coords",JSON.stringify(usercoordinates));
    
    userweatherapicall(usercoordinates);

  }



function Geolocationcoords(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        geotext2.textContent = "Geolocation is not supported by this browser.";
      }
}



//tab click
usertab.addEventListener('click',()=>{
    switchtab(usertab);
    // addactiveclass(usertab);
})
searchtab.addEventListener('click',()=>{
    switchtab(searchtab);
    // addactiveclass(searchtab);
})



//grant access btn 
grantbutton.addEventListener('click',()=>{
    Geolocationcoords();
})
//input search



const inputsearch=document.querySelector('[data-search]');




const btnsearch=document.querySelector('.btnsearch');
inputsearch.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        inputvalue(e);
    }
});
btnsearch.addEventListener('click',()=>{
    const inputsearch=document.querySelector('[data-search]');
    if(inputsearch.value=="")return;
    else fetchdata(inputsearch.value);
    
});


function inputvalue(e){
   
    if(e.target.value==="")return;
    else{
        fetchdata(e.target.value);
    }

}
async function fetchdata(cityvalue){
    const inputsearch=document.querySelector('[data-search]');
           
            inputsearch.value="";
    loadingstate.classList.add("active");
   errorpage.classList.remove('active');
    grantaccess.classList.remove('active');
    weatherinfo.classList.remove("active");
    try{
        let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${Apikey}&units=metric`);
        let data=await response.json();
        showdataonscreen(data);
        loadingstate.classList.remove("active");
        weatherinfo.classList.add("active");
        





    }
    catch(err){
        loadingstate.classList.remove("active");
        errorpage.classList.add('active');
        
    }
}
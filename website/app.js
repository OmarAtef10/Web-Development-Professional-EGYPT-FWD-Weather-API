/* Global Variables */
//URL and Key for the open weather API...


const API='http://api.openweathermap.org/data/2.5/weather?zip=';

const APIKey= '&appid=9603289a29934f74046218f47fe4036f&units=metric';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//event to trigger the addData fuction to update existing element...

document.getElementById('generate').addEventListener('click',Action);

//Action function called by listener..

function Action(event){
    //using text box to extract input...
    //and the weather api to extract the tempreatures (in kelvin)...

    const location = document.getElementById('zip').value; //if zipcode is not valid console would output it that 404 city not found...
    const feelings= document.getElementById('feelings').value;
        weather(API, location , APIKey)
            .then(function(data){
                console.log(data); //just making sure that data contains all the json data we got from the API...

                postData('/addData',{date:newDate, tempreature:data.main.temp ,feelings})
            })
            .then(function(){
                UIupdate();

            })
        }


        //using async so that we could use await so that we would fetch our data from the API...
        //weather is used in the above function to return the tempreature...
const weather = async(API , zip , APIKey) => {

    const res = await fetch(API + zip + APIKey);
    try{
            //console.log(res); //for checking the value of res


        const data=  res.json();
        //console.log("in fetch ely gowa weather");  // checking that the code passed through here

        //console.log(data.json); // was trying something but it made an error......

        return data;


    } catch(error){
        console.log("error " + error );

    }
}

//post function to return JSON data type
const postData = async(url ="" , data={})=>{
    console.log(data);

const response = await fetch (url , {

    method:"POST",
    credentials: "same-origin",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data),})


try{
    const newData = await response.json();
    return newData;

}

catch(error){
    console.log('error '+ error);

}
};
//async function we called earlier ...
//function used to update the UI of our webpage...
const UIupdate = async () => {
    const request = await fetch('/all');
   console.log(request);
    try {
      const allData = await request.json()
      
      console.log(allData);

      
      // update new entry values
      document.getElementById('date').innerHTML ="Date is: " + allData.date;
      document.getElementById('temp').innerHTML = "Tempreature is: " +allData.temp + " in Celcius..";
      document.getElementById('content').innerHTML ="Feeling is:  "+ allData.feelings;
    }
    catch (error) {
      console.log("error " + error);
    }
  };//NOTE for some reason you must click on generate twice in order for the update of the UI to appear......


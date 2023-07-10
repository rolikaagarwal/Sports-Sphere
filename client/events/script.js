const url = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/international';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b75bc38d86mshd94af1228d3a9c1p1feb81jsn47cf9ba6666b',
		'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};

const events = () => {
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            const arr = result.seriesMapProto;
            arr.forEach(element => {
                document.querySelector(".alleventcontainer").innerHTML+=`
                <div class="event-container">
                <div class="date">
                    <h3>${element.date}</h3>
                   
        
                </div>
                <div class="events">
                    <h2>${element.series[0].name} </h2>
                     <p></p>
                     <p>pragati maidan </p>
                     <p>new delhi</p>
                </div>
            </div>`
                
            });
            
        })
        .catch(error => {
            console.error(error);
        });
}

events();
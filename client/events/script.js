const url = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/international';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b96b30d00emsh3974a59ad94e416p19bf55jsndf8de1b68e85',
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
                    <h3></h3>
                   
        
                </div>
                <div class="events">
                    <h2>event name</h2>
                     <p>wed 7 -- wed 8  </p>
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
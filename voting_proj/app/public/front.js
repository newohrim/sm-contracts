async function create_vote(evt) 
{
  console.log("clicked");
  
  const response = await fetch("http://localhost:8080/create_vote", {
	method: 'POST',
	headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
	},
	body: `{
	"Id": 78912,
	"Customer": "Jason Sweet",
	"Quantity": 1,
	"Price": 18.00
	}`,
});

response.text().then(function (text) {
  alert(text);
});

//response.json().then(data => {
//  console.log(data);
//});

}
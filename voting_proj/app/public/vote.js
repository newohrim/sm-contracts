console.log(window.location.pathname.substring(1));

async function vote(evt) 
{
    const body = { 
        name: window.location.pathname.substring(1), 
        option: document.getElementById("options").value
    };
    console.log(JSON.stringify(body));
    const response = await fetch("http://127.0.0.1:8080/make_choise", {
        headers: {
        method: 'POST',
	'Accept': 'application/json',
	'Content-Type': 'application/json'
	},
	body: JSON.stringify(body),
    });

    response.text().then(function (text) {
        alert(text);
    });
}
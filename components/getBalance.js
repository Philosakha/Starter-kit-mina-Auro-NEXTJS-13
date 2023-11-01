"use server"

const getAccountBalance = async(accounts) =>{
    const apiUrl = `https://api.minaexplorer.com/accounts/${accounts}`;
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Add any headers you need
        },
      });
    if(response.ok){
        const data = await response.json();
        console.log(data);
    }
    else{
        console.log("Error");
    }
}
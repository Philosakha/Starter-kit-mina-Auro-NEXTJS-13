"use server"

export const getAccountBalance = async(accounts) =>{
    const apiUrl = `https://api.minaexplorer.com/fees/${accounts}`;
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Add any headers you need
        },
      });
    if(response.ok){
        const data = await response.json();
       return data;
    }
    else{
        console.log("Error");
    }
}
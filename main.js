
const main = document.getElementById('main')
async function listBills(){

    let html = `<table><tr><th>Bill Number</th><th>Bill period</th><th>Bill amount</th><th>Client id</th><th>Edit</th><th>Delete</th></tr>`
    const response = await fetch("http://localhost:3000/bills")
    const data = await response.json()
    for (let bill of data){
        html += `<tr><td>${bill.bill_number}</td><td>${bill.bill_period}</td><td>${bill.bill_amount}</td><td>${bill.client_id}</td><td><button class="edit-btn" data-id="${bill.bill_number}">Edit</button></td><td><button class="delete-btn" data-id="${bill.bill_number}">Delete</button></td></tr>`
    }

    html += "</table>"
    main.innerHTML = html

}
addEventListener("DOMContentLoaded", ()=>{
    listBills()
})
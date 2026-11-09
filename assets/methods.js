/* const nameInput = document.querySelector('input#name')
const link = '/user/' + nameInput.dataset.id */



document.querySelector('#deleteBtn').addEventListener('click', async (event)=>{
    const userid = event.currentTarget.dataset.userid
    console.log(userid)
    event.preventDefault()
    if(!confirm('Er du sikker på du vil slette?')) return

        const response = await fetch('/users/' + userid, {method: 'DELETE'})
            window.location = '/users'
})

document.querySelector('#editBtn').addEventListener('click', async (event) =>{
    event.preventDefault()
    const name = nameInput.value.trim()
    const type = typeInput.value.trim()
    if(!name) return alert('Navnet må ikke være tomt')
    if(!type) return alert ('Type må ikke være tomt')

    try{
        const response = await fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name})
        })
        if (!response.ok) throw new Error('status' + response.status)
        window.location = '/'
    } catch(error) {
        alert('Kunne ikke gemme navnet: ' + error.message)
    }
})
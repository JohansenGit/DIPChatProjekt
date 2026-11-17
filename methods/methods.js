/* const nameInput = document.querySelector('input#name')
const link = '/user/' + nameInput.dataset.id */


document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', async (event) => {
        console.log("delete")
        const id = event.currentTarget.dataset.id
        const type = event.currentTarget.dataset.type

        event.preventDefault()

        if (!confirm('Er du sikker på du vil slette?')) return

        const response = await fetch(`/${type}/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            window.location = `/${type}`
        }
    })
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


/* const nameInput = document.querySelector('input#name')
const link = '/user/' + nameInput.dataset.id */

//Slet bruger knap
document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', async (event) => {
        const id = event.currentTarget.dataset.id
        const type = event.currentTarget.dataset.type

        if (!confirm('Er du sikker på du vil slette?')) return

        try {
            const response = await fetch(`/${type}/${id}/deleteUser`, {
                method: 'DELETE'
            })

            if (response.ok) {
                window.location.href = '/users/administration'
            } else {
                console.log('Kunne ikke slette brugeren:', response.status)
            }
        } catch (error) {
            console.log('Fejl:', error)
        }
    })
})


//Rename chat knap
const renameBtn = document.querySelector('#renameBtn')

document.querySelector('#renameBtn').addEventListener('click', async (event) =>{
    event.preventDefault()
    const chatID = renameBtn.dataset.id
    const currentName = renameBtn.dataset.name
    const link = `/chats/${chatID}`
    const name = window.prompt('Indtast nyt chatnavn', currentName)

    if (name === null) return

    const trimmedName = name.trim()
    if(!trimmedName) return alert('Navnet må ikke være tomt')

    try{
        const response = await fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({chatName: trimmedName})
        })
        if (!response.ok) throw new Error('status' + response.status)
        window.location.reload()
    } catch(error) {
        alert('Kunne ikke gemme navnet: ' + error.message)
    }
})


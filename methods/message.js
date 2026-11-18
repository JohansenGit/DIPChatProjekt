const form = document.getElementById('messageForm')
const input = document.getElementById('messageInput')
const errorMessage = document.getElementById('errorMessage')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const response = await fetch(form.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(form))
    })

    if (response.status === 403) {
        const data = await response.json()

        input.style.border = '2px solid red'
        errorMessage.textContent = data.message

    } else if (response.ok) {
        window.location.reload()
    }
})
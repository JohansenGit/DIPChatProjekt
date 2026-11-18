setInterval(async () => {
    try {
        await fetch('/users/heartbeat', {
            method: 'POST'
        })
    } catch (error) {
        console.log('Heartbeat failed:', error)
    }
}, 10000)
export const url = 'https://l2p-back-production.up.railway.app/'
// export const url = 'http://localhost:5000/'

export const discordRedirectLink = 'https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&response_type=code&redirect_uri=https%3A%2F%2Fl2p-back-production.up.railway.app%2Fdiscord&scope=identify'
// export const discordRedirectLink = 'https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&redirect_uri=https%3A%2F%2Fnoname-backend-production.up.railway.app%2Fdiscord&response_type=code&scope=identify'
// export const discordRedirectLink = 'https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdiscord&response_type=code&scope=identify'

export const api = 'https://l2p-back-production.up.railway.app'
// export const api = 'http://localhost:5000'


export const config = {
    createUrl: (path) => `${api}/api/${path}`
}


const ip = import.meta.env
export const API_DOMAIN =  ip.VITE_API_DOMAIN
export const API_DOMAIN_PORT =  ip.VITE_API_DOMAIN_PORT
export const API_DOMAIN_FULL_URL = `${API_DOMAIN}:${API_DOMAIN_PORT}`

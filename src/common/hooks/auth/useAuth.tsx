export default function useAuth(token: string) {
    const configs = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return configs;
}

import jsonwebtoken from 'jsonwebtoken'

const authenticate = (context: any): { username: string, id: string } | null => {
    const { token } = context
    if (!token || token.length === 0) throw new Error("Forbidden")
    const authToken = token.split(' ')[1]
    try {
        const decoded = jsonwebtoken.verify(authToken, process.env.ACCESS_TOKEN_SECRET as string) as any;
        return { username: decoded.username as string, id: decoded.id as string }
    } catch (err) {
        return null;
    }
}

export default authenticate
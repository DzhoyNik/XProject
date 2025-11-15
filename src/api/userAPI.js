import { $host, $authHost } from ".";
import { jwtDecode } from "jwt-decode"

export const signUp = async ({ payload }) => {
    const { data } = await $host.post("/users/sign_up", payload)
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const signIn = async ({ payload }) => {
    const { data } = await $host.post("/users/sign_in", payload)
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get("users/auth")
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}
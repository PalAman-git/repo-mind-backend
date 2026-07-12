import { UserRow } from "src/users/types/user.types"

export interface AuthResponseDto {
    accessToken : string
    user : UserRow
}
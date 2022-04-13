import { currentUser } from "./api-tests/user";

export default function handler(req, res) {
    res.status(200).json(currentUser)
}
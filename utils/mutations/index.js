import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
    mutation LoginUser($userName: String!, $password: String!) {
        loginUser(userName: $userName, password: $password)
    }`

export const CREATE_USER_MUTATION = gql`
    mutation CreateAndRegisterUser($createUserInput: RegisterUserInput!) {
        createAndRegisterUser(input: $createUserInput) {
            id 
            name 
            userName
            avatar
            bio
            }
        }`
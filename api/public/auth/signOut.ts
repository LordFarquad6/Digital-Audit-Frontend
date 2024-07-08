import axios from 'axios'

export const signOut = () => {
  return axios({
    method: 'DELETE',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/sign-out`,
    withCredentials: true,
  }).then(({ data }) => data)
}

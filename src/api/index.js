import ky from 'ky'

const api = ky.create({
  prefixUrl: 'http://localhost:3031'
});

export const getWebsite = () => {
  return api.get()
}
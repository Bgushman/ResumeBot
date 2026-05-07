import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export async function uploadResume(file, major) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('major', major)
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export async function sendMessage(sessionId, message) {
  const response = await api.post(`/chat/${sessionId}`, { message })
  return response.data
}

export async function getSessions() {
  const response = await api.get('/sessions')
  return response.data
}

export async function getSession(sessionId) {
  const response = await api.get(`/sessions/${sessionId}`)
  return response.data
}

export async function deleteSession(sessionId) {
  const response = await api.delete(`/sessions/${sessionId}`)
  return response.data
}

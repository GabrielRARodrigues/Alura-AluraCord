import { createClient } from '@supabase/supabase-js'

export default async function messages(request, response) {
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
  const SUPABASE_URL = process.env.SUPABASE_URL

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  async function fetchAllMessages() {
    const { data } = await supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })

    return response.json(data)
  }

  async function createMessage() {
    const { message } = request.body

    await supabaseClient.from('messages').insert([message])

    return response.json({})
  }

  switch (request.method) {
    case 'GET':
      return await fetchAllMessages()
    case 'POST':
      return await createMessage()
    default:
      break
  }
}

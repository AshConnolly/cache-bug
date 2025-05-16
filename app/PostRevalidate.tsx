const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const currentReadableTime = () => {
  const now = new Date()
  return now.toLocaleTimeString()
}
const url = 'https://jsonplaceholder.typicode.com/posts/1'

const getPost = async () => {
  const res = await fetch(url, {
    next: { revalidate: 5 },
  })
  const data = await res.json()
  console.log('data: ', data)
  await delay(2000)
  return {
    time: currentReadableTime(),
    post: data,
  }
}

export const PostRevalidate = async () => {
  const { post, time } = await getPost()

  return (
    <div>
      <p>post:</p>
      <div>{time}</div>
      <div>{JSON.stringify(post)}</div>
    </div>
  )
}

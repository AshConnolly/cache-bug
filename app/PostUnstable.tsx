import { unstable_cache } from 'next/cache'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const currentReadableTime = () => {
  const now = new Date()
  return now.toLocaleTimeString()
}
const url = 'https://jsonplaceholder.typicode.com/posts/1'

const getPosts = unstable_cache(
  async () => {
    const res = await fetch(url)
    // const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    await delay(2000)
    return {
      time: currentReadableTime(),
      post: data,
    }
  },
  ['temperature-data'], // Cache key
  { revalidate: 5, tags: ['temperature'] } // Expire after 5 seconds
)

const Post = async () => {
  const { post, time } = await getPosts()

  return (
    <div>
      <p>post:</p>
      <div>{time}</div>
      <div>{JSON.stringify(post)}</div>
    </div>
  )
}

export default Post

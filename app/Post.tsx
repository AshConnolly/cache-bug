const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const currentReadableTime = () => {
  const now = new Date()
  return now.toLocaleTimeString()
}
const url = 'https://jsonplaceholder.typicode.com/posts/1'

// using revalidate
const get1 = async () => {
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

// using unstable_cache
// const get2 = unstable_cache(
//   async () => {
//     const res = await fetch(url)
//     // const res = await fetch(url, { cache: 'no-store' })
//     const data = await res.json()
//     await delay(2000)
//     return {
//       time: currentReadableTime(),
//       post: data,
//     }
//   },
//   ['temperature-data'], // Cache key
//   { revalidate: 5, tags: ['temperature'] } // Expire after 5 seconds
// )

const Post = async () => {
  const { post, time } = await get1()

  return (
    <div>
      <p>post:</p>
      <div>{time}</div>
      <div>{JSON.stringify(post)}</div>
    </div>
  )
}

export default Post

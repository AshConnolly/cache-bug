import { Suspense } from 'react'
import Post from './Post'
import { PostRevalidate } from './PostRevalidate'

// export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <div className="">
      <main className="flex w-[500px] flex-col space-y-16 p-16">
        <div className="space-y-4">
          <p>Goal:</p>
          <ul className="list-disc">
            <li>Use suspense - showing "loading" when fetching</li>
            <li>then cache for 5 seconds</li>
            <li>after 5 seconds do not show stale data, show loading and refetch fresh data</li>
            <li>and work in both dev and prod</li>
          </ul>
        </div>

        <div>
          <p>PostRevalidate</p>
          <Suspense fallback={<div>Loading...</div>}>
            <PostRevalidate />
          </Suspense>
        </div>

        <div>
          <p>PostUnstable</p>
          <Suspense fallback={<div>Loading...</div>}>
            <Post />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

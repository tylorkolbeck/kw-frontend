const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`

export async function getSortedVideoData(limit = 5) {
  const response = await fetch(
    `${API_URL}/videos?_sort=publishedAt:DESC&_limit=${limit}`
  )
  const videos = await response.json()
  return videos
}

export async function getAllVideoIds() {
  const videos = await getSortedVideoData()

  return videos.map((video) => {
    return {
      params: {
        slug: video.slug
      }
    }
  })
}

export async function getVideoData(slug) {
  const response = await fetch(`${API_URL}/videos/${slug}`)
  const videoData = await response.json()

  return {
    slug,
    ...videoData
  }
}
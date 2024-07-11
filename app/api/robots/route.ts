import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const host = req.headers.get('host')
  let robotsTxt

  if (host === 'yourdomain.com') {
    robotsTxt = 'User-agent: *\r\nAllow: /'
  } else {
    robotsTxt = 'User-agent: *\r\nDisallow: /'
  }

  robotsTxt += `\r\n\r\nSitemap: ${
    req.headers.get('x-forwarded-proto') ? 'https' : 'http'
  }://${host}/sitemap.xml`

  const response = new NextResponse(robotsTxt)
  response.headers.set('Content-Type', 'text/plain')

  return response
}

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

type Middleware = (request: NextRequest) => NextResponse



export default function middleware(request: NextRequest) {

  return NextResponse.next()
  
}

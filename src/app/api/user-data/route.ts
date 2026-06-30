import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

function getUserId(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  const user = verifyToken(auth.slice(7))
  return user?.userId ?? null
}

export async function GET(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const conn = await connectToDatabase()
  if (!conn) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })

  const doc = await conn.db.collection('user-data').findOne({ userId })
  if (!doc) return NextResponse.json({ data: null })

  const { _id, ...data } = doc
  return NextResponse.json({ data })
}

export async function PUT(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const conn = await connectToDatabase()
  if (!conn) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })

  await conn.db.collection('user-data').updateOne(
    { userId },
    { $set: { ...body, userId, updatedAt: new Date() } },
    { upsert: true }
  )

  return NextResponse.json({ ok: true })
}

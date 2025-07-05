// src/lib/db.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

type MongooseGlobal = {
  mongoose: {
    conn: typeof import('mongoose') | null
    promise: Promise<typeof import('mongoose')> | null
  }
}

declare global {
  var mongoose: MongooseGlobal['mongoose']
}

const cached = global.mongoose || { conn: null, promise: null }


export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }
  cached.conn = await cached.promise
  
  return cached.conn
}

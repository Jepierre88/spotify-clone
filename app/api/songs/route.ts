// app/api/songs/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const data = [
    {
      title: 'Para ti',
      items: [
        {
          id: '1',
          title: 'Blinding Lights',
          artist: 'The Weeknd',
          cover: '/images/blinding-lights.jpg',
          duration: '3:20',
          url: '/songs/blinding-lights.mp3',
        },
        {
          id: '2',
          title: 'Levitating',
          artist: 'Dua Lipa',
          cover: '/images/levitating.jpg',
          duration: '3:23',
          url: '/songs/levitating.mp3',
        },
      ],
    },
    {
      title: 'Top del momento',
      items: [
        {
          id: '3',
          title: 'Dance the Night',
          artist: 'Dua Lipa',
          cover: '/images/dance-the-night.jpg',
          duration: '2:58',
          url: '/songs/dance-the-night.mp3',
        },
        {
          id: '4',
          title: 'As It Was',
          artist: 'Harry Styles',
          cover: '/images/as-it-was.jpg',
          duration: '2:47',
          url: '/songs/as-it-was.mp3',
        },
      ],
    },
    {
      title: 'Tus mezclas',
      items: [
        {
          id: '5',
          title: 'Indie Jam',
          artist: 'Mix de artistas',
          cover: '/images/indie-jam.jpg',
          duration: '45:00',
          url: '/songs/indie-jam.mp3',
        },
        {
          id: '6',
          title: 'Daily Mix 1',
          artist: 'Mix personalizado',
          cover: '/images/daily-mix-1.jpg',
          duration: '50:00',
          url: '/songs/daily-mix-1.mp3',
        },
      ],
    },
  ]

  return NextResponse.json(data)
}

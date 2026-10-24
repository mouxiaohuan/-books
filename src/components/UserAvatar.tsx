import { Image, View, Text } from '@tarojs/components'
import janeAvatar from '../assets/jane-avatar.png'

const colors = ['#e0f1ea', '#e8edf8', '#fff0dc', '#f4e7ed', '#e5f0f3']
const inks = ['#18775a', '#385ca1', '#a76315', '#a64872', '#28778b']

export default function UserAvatar({ name, id, large = false, image }: { name: string; id: string; large?: boolean; image?: string }) {
  const index = Number(id) % colors.length || 0
  const initials = name.includes(' ') ? name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() : name.slice(-2)
  const isJohn = name === 'John Doe'
  return <View className={`avatar ${large ? 'avatar--large' : ''} ${image ? 'avatar--image' : ''}`} style={{ backgroundColor: isJohn ? '#7087a2' : colors[index], color: isJohn ? '#fff' : inks[index] }}>{image ? <Image src={janeAvatar} mode='aspectFill' /> : <Text>{initials}</Text>}</View>
}

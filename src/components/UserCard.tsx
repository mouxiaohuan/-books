import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { User } from '../types/user'
import UserAvatar from './UserAvatar'

export default function UserCard({ user, onClick }: { user: User; onClick: () => void }) {
  const copyUser = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
    const content = [
      user.name,
      `Gender: ${user.gender === 'female' ? '♀' : '♂'}`,
      `Date of Birth: ${user.birthDate}`,
      `Phone: ${user.phone}`,
      `Email: ${user.email}`,
      `Store: ${user.store}`
    ].join('\n')

    Taro.setClipboardData({
      data: content,
      options: { hideDefaultMessage: true },
      success: () => Taro.showToast({ title: '已复制', icon: 'success' }),
      fail: () => Taro.showToast({ title: '复制失败，请重试', icon: 'none' })
    })
  }

  return <View className='user-card reference-card' onClick={onClick}>
    <View className='user-card__header'><UserAvatar name={user.name} id={user.id} image={user.avatar} /><View className='user-card__identity'><Text className='user-card__name'>{user.name}</Text><Text className='user-card__gender'>Gender: <Text className={`gender-symbol gender-symbol--${user.gender}`}>{user.gender === 'female' ? '♀' : '♂'}</Text></Text></View></View>
    <View className='user-card__details'><View className='user-card__birth'><Text>Date of Birth: {user.birthDate}</Text><View className='copy-button' onClick={copyUser} role='button' aria-label='复制用户信息'><View className='copy-icon'><View className='copy-icon__back' /><View className='copy-icon__front' /></View></View></View><Text className='user-card__line'>
      <Text className='contact-icon'>☎</Text>
      {user.phone}</Text>
      <Text className='user-card__line'>
        <Text className='contact-icon-Email'>✉</Text>
        Email: {user.email}</Text>
    </View>
  </View>
}

import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Button, Input, Picker, Text, View } from '@tarojs/components'
import type { UserInput } from '../../types/user'
import './index.scss'

const empty: UserInput = { name: '', gender: 'male', birthDate: '', email: '', phone: '', store: '' }
export default function UserFormPage() {
  const [form, setForm] = useState<UserInput>(empty)
  const update = (key: keyof UserInput, value: string) => setForm(current => ({ ...current, [key]: value }))
  return <View className='reference-page register-page'>
    <View className='route-switch route-switch--form'><Text onClick={() => Taro.navigateBack()}>← 列表管理</Text></View>
    <Text className='register-title'>Member Registration</Text>
    <View className='register-field'><Text>姓名 <Text className='required'>*</Text></Text><Input value={form.name} placeholder='请输入姓名...' onInput={event => update('name', event.detail.value)} /></View>
    <View className='register-field'><Text>性别 <Text className='required'>*</Text></Text><View className='gender-switch'><View className={form.gender === 'male' ? 'gender-active' : ''} onClick={() => update('gender', 'male')}>男</View><View className={form.gender === 'female' ? 'gender-active' : ''} onClick={() => update('gender', 'female')}>女</View></View></View>
    <View className='register-field'><Text>生日 <Text className='required'>*</Text></Text><Picker mode='date' value={form.birthDate || '1990-01-01'} onChange={event => update('birthDate', event.detail.value)}><View className='picker-input'>{form.birthDate || '请选择生日...'}</View></Picker></View>
    <View className='register-field'><Text>邮箱 <Text className='required'>*</Text></Text><Input value={form.email} placeholder='请输入邮箱...' onInput={event => update('email', event.detail.value)} /></View>
    <View className='register-field'><Text>电话 <Text className='required'>*</Text></Text><View className='phone-input'><View>+86</View><Input value={form.phone} placeholder='请输入手机号...' onInput={event => update('phone', event.detail.value)} /></View></View>
    <View className='register-field'><Text>门店 <Text className='required'>*</Text></Text><Picker mode='selector' range={['请选择门店...', '北京门店', '上海门店']} onChange={event => update('store', ['请选择门店...', '北京门店', '上海门店'][Number(event.detail.value)])}>
      <View className='picker-input'>{form.store || '请选择门店...'}
        <Text className='register-field-arrow'>⌄</Text>
      </View>
    </Picker></View>
    <Button className='submit-button' onClick={() => Taro.showToast({ title: '提交成功', icon: 'success' })}>提交</Button>
  </View>
}

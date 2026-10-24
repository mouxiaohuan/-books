import { useState } from 'react'
import Taro from '@tarojs/taro'
import { Button, Input, Picker, Text, View } from '@tarojs/components'
import type { UserInput } from '../../types/user'
import './index.scss'

const empty: UserInput = { name: '', gender: 'male', birthDate: '', email: '', phone: '', store: '' }
type FormErrors = Partial<Record<keyof UserInput, string>>

export default function UserFormPage() {
  const [form, setForm] = useState<UserInput>(empty)
  const [errors, setErrors] = useState<FormErrors>({})

  const update = (key: keyof UserInput, value: string) => setForm(current => ({ ...current, [key]: value }))
  const updateField = (key: keyof UserInput, value: string) => {
    update(key, value)
    setErrors(current => ({ ...current, [key]: undefined }))
  }

  const submit = () => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = '请输入姓名'
    if (!form.gender) next.gender = '请选择性别'
    if (!form.birthDate) next.birthDate = '请选择生日'
    if (!form.email.trim()) next.email = '请输入邮箱'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = '请输入有效的邮箱地址'
    if (!form.phone.trim()) next.phone = '请输入手机号'
    else if (!/^\+?[0-9][0-9\s().-]{5,19}$/.test(form.phone.trim())) next.phone = '请输入有效的电话号码'
    if (!form.store) next.store = '请选择门店'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      Taro.showToast({ title: '请完善表单信息', icon: 'none' })
      return
    }
    Taro.showToast({ title: '提交成功', icon: 'success' })
  }

  return <View className='reference-page register-page'>
    <View className='route-switch route-switch--form'><Text onClick={() => Taro.redirectTo({ url: '/pages/users/index' })}>← 列表管理</Text></View>
    <Text className='register-title'>Member Registration</Text>
    <View className='register-field'><Text>姓名 <Text className='required'>*</Text></Text><Input className={errors.name ? 'register-control register-control--error' : 'register-control'} value={form.name} placeholder='请输入姓名...' onInput={event => updateField('name', event.detail.value)} /><Text className='register-error'>{errors.name || ''}</Text></View>
    <View className='register-field'><Text>性别 <Text className='required'>*</Text></Text><View className={`gender-switch ${errors.gender ? 'register-control--error' : ''}`}><View className={form.gender === 'male' ? 'gender-active' : ''} onClick={() => updateField('gender', 'male')}>男</View><View className={form.gender === 'female' ? 'gender-active' : ''} onClick={() => updateField('gender', 'female')}>女</View></View><Text className='register-error'>{errors.gender || ''}</Text></View>
    <View className='register-field'><Text>生日 <Text className='required'>*</Text></Text><Picker mode='date' value={form.birthDate || '1990-01-01'} onChange={event => updateField('birthDate', event.detail.value)}><View className={`picker-input ${errors.birthDate ? 'register-control--error' : ''}`}>{form.birthDate || '请选择生日...'}</View></Picker><Text className='register-error'>{errors.birthDate || ''}</Text></View>
    <View className='register-field'><Text>邮箱 <Text className='required'>*</Text></Text><Input className={errors.email ? 'register-control register-control--error' : 'register-control'} value={form.email} placeholder='请输入邮箱...' onInput={event => updateField('email', event.detail.value)} /><Text className='register-error'>{errors.email || ''}</Text></View>
    <View className='register-field'>
      <Text>电话 <Text className='required'>*</Text></Text>
      <View className={`phone-input ${errors.phone ? 'register-control--error' : ''}`}>
        <View>+86</View>
        <Input className='phone register-control' value={form.phone} placeholder='请输入手机号...' onInput={event => updateField('phone', event.detail.value)} />
      </View>
      <Text className='register-error'>{errors.phone || ''}</Text>
    </View>
    <View className='register-field'><Text>门店 <Text className='required'>*</Text></Text><Picker mode='selector' range={['请选择门店...', '北京门店', '上海门店']} onChange={event => updateField('store', ['请选择门店...', '北京门店', '上海门店'][Number(event.detail.value)])}>
      <View className='picker-input'>{form.store || '请选择门店...'}
        <Text className='register-field-arrow'>⌄</Text>
      </View>
    </Picker><Text className='register-error'>{errors.store || ''}</Text></View>
    <Button className='submit-button' onClick={submit}>提交</Button>
  </View>
}

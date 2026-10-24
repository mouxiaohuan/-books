import { useEffect, useMemo, useState } from 'react'
import Taro from '@tarojs/taro'
import { Icon, Input, Text, View } from '@tarojs/components'
import UserCard from '../../components/UserCard'
import { users } from '../../mock/users'
import type { UserQuery } from '../../types/user'
import './index.scss'

export default function UsersPage() {
  const [query, setQuery] = useState<UserQuery>({ q: '', sort: 'name' })
  const [showSort, setShowSort] = useState(true)
  const [loading, setLoading] = useState(true)
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 700); return () => clearTimeout(timer) }, [])
  const filtered = useMemo(() => users.filter(user => !query.q || `${user.name}${user.email}${user.phone}`.toLowerCase().includes(query.q.toLowerCase())).sort((a, b) => query.sort === 'name' ? a.name.localeCompare(b.name) : b.dateAdded.localeCompare(a.dateAdded)), [query])

  return <View className='reference-page list-page'>
    <View className='route-switch'><Text>列表管理</Text><Text className='route-switch__active' onClick={() => Taro.navigateTo({ url: '/pages/user-form/index' })}>用户注册 →</Text></View>
    <View className='reference-tools'><View className='reference-search'><Icon type='search' size={22} color='#7c858b' /><Input value={query.q} placeholder='搜索姓名或电话...' onInput={event => setQuery(current => ({ ...current, q: event.detail.value }))} /></View><View className={`sort-filter ${showSort ? 'sort-filter--active' : ''}`} onClick={() => setShowSort(value => !value)}><View className='filter-icon'><View /><View /><View /></View><Text>Sort &amp; Filter</Text></View></View>
    {showSort && <View className='sort-menu'><View onClick={() => { setQuery(current => ({ ...current, sort: 'name' })); setShowSort(false) }}>Name A-Z</View><View onClick={() => { setQuery(current => ({ ...current, sort: 'date' })); setShowSort(false) }}>Date Added</View></View>}
    <View className='reference-list'>{loading ? <><Text className='reference-loading'>Loading...</Text>{[1, 2].map(item => <View className='reference-card reference-card--skeleton' key={item}><View className='skeleton-avatar' /><View className='skeleton-lines'><View /><View /><View /></View></View>)}</> : filtered.map(user => <UserCard key={user.id} user={user} onClick={() => undefined} />)}</View>
    <View className='loading-more'><View className='loading-spinner' /><Text>Loading More...</Text></View>
  </View>
}

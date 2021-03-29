import type { inferHandlerInput } from '@trpc/server'
import type { AppRouter } from '../pages/api/trpc/[trpc]'
export type AlarmCreateParam = inferHandlerInput<
  AppRouter['_def']['mutations']['alarms.add']
>[0]
export type AlarmEditParam = inferHandlerInput<
  AppRouter['_def']['mutations']['alarms.edit']
>[0]
export const emptyAlarm = (): AlarmCreateParam => ({
  type: 'repeat',
  ahead: 0,
  title: '',
  notify: true,
  alert: false,
  duration: 0,
  disabled: false,
})

export enum AlarmType {
  once = 'once',
  repeat = 'repeat',
}

export const Duration = {
  M1: 60 * 1000,
  H1: 60 * 60 * 1000,
}

export const IsServer = typeof window ==='undefined'

const u = IsServer ? new URL('https://localhost') : new URL(location.href)
export const uid = u.searchParams.get('id') || ''

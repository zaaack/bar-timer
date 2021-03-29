import React, { useEffect } from 'react'
import dayjs from 'dayjs'

import { ReactSortable } from 'react-sortablejs'
import { trpc } from '../utils/trpc'
import type { Alarm } from '../../../node_modules/.prisma/client'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { AlarmEditParam, uid } from '../utils'
import { AlarmManager } from '../alarm-manager'

export function List() {
  let history = useHistory()
  const allAlarms = trpc.useQuery(['alarms.all', uid], {
    staleTime: 3000,
  })
  const sortAlarms = trpc.useMutation('alarms.sortAll', {
    async onMutate(ids) {
      await trpc.cancelQuery(['alarms.all'])
      let alarmMap = new Map(allAlarms.data?.map((a) => [a.id, a]))
      trpc.setQueryData(
        ['alarms.all'],
        ids.map((id) => alarmMap.get(id)!).filter(Boolean)
      )
    },
    onSettled: () => {
      trpc.invalidateQuery(['alarms.all'])
    },
  })
  const saveSortList = async (newAlarms: Alarm[]) => {
    sortAlarms.mutate(newAlarms.map((a) => a.id))
  }
  const deleteAlarm = trpc.useMutation('alarms.delete', {
    async onMutate(alarmId) {
      await trpc.cancelQuery(['alarms.all'])
      trpc.setQueryData(
        ['alarms.all'],
        allAlarms.data!.filter((t) => t.id != alarmId)
      )
    },
    onSettled: () => {
      trpc.invalidateQuery(['alarms.all'])
    },
  })
  const editAlarm = trpc.useMutation('alarms.edit', {
    async onMutate(alarm) {
      await trpc.cancelQuery(['alarms.all'])
      trpc.setQueryData(
        ['alarms.all'],
        allAlarms.data!.map((a) => (a.id === alarm.id ? { ...a, ...alarm } : a))
      )
    },
    onSettled: () => {
      trpc.invalidateQuery(['alarms.all'])
    },
  })
  useEffect(() => {
    if (allAlarms.data) {
      new AlarmManager(allAlarms.data, (a: AlarmEditParam) => {
        editAlarm.mutate(a)
      })
    }
  }, [allAlarms.data])
  return (
    <nav className="panel">
      <p className="panel-heading">
        <span style={{ flex: 1 }}>整点报时</span>
        <button
          className="button is-link is-small"
          style={{ marginRight: 10 }}
          title="保存永久链接"
          onClick={(e) => {
            let u = new URL(location.href)
            u.searchParams.append('id', nanoid())
            location.href = u.toString()
          }}
        >
          <i className="fas fa-external-link-alt" aria-hidden="true"></i>
        </button>
        <button
          className="button is-primary is-small"
          title="添加新的提醒"
          onClick={(e) => {
            history.push(`/form`)
          }}
        >
          <i className="fas fa-plus" aria-hidden="true"></i>
        </button>
      </p>
      <ReactSortable list={allAlarms.data || []} setList={saveSortList}>
        {allAlarms.data?.map((a) => {
          return (
            <a key={a.id} className="panel-block">
              <span className="panel-icon">
                <i
                  className={`fas fa-${
                    a.type === 'once' ? 'hourglass-half' : 'sync'
                  }`}
                  aria-hidden="true"
                ></i>
              </span>
              <span className="ca-title">
                {a.title}
                <div className="ca-subtitle">
                  {a.type === 'once'
                    ? dayjs(Number(a.timeout)).format('YYYY/MM/DD HH:mm')
                    : dayjs(Number(a.duration)).add(-8, 'h').format('HH:mm')}
                </div>
              </span>
              <i
                className={`fas fa-times remove-btn`}
                aria-hidden="true"
                onClick={(e) => {
                  let b = confirm(`确定要删除「${a.title}」吗?`)
                  if (b) {
                    deleteAlarm.mutate(a.id)
                  }
                }}
              ></i>
              <i
                className={`fas fa-cog config-btn`}
                aria-hidden="true"
                onClick={(e) => {
                  history.push(`/form?id=${a.id}`)
                }}
              ></i>
              <div className="field">
                <input
                  id={a.id}
                  type="checkbox"
                  className="switch"
                  defaultChecked={!a.disabled}
                  onChange={(e) => {
                    // save({ ...a, disabled: !e.target.checked })
                    editAlarm.mutate({
                      ...a,
                      disabled: !e.target.checked,
                    } as any)
                  }}
                />
                <label htmlFor={a.id}></label>
              </div>
            </a>
          )
        })}
      </ReactSortable>
    </nav>
  )
}

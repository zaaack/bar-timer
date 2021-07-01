import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import cx from 'clsx'

import { ReactSortable } from 'react-sortablejs'
import { trpc } from '../utils/trpc'
import type { Alarm } from '../../../node_modules/.prisma/client'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { AlarmCreateParam, AlarmEditParam, uid } from '../utils'
import { AlarmManager } from '../alarm-manager'

export function List() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const sortTimerRef = useRef<NodeJS.Timer| null>(null)
  const allAlarms = trpc.useQuery(['alarms.all', uid], {
    staleTime: 10000,
  })
  const alarmManager = useRef<AlarmManager | null>(null)
  const sortAlarms = trpc.useMutation('alarms.sortAll', {
    onSettled: () => {
      trpc.invalidateQuery(['alarms.all', uid])
    },
  })
  const saveSortList = async (newAlarms: Alarm[]) => {
    const ids = newAlarms.map((a) => a.id)
    let alarmMap = new Map(allAlarms.data?.map((a) => [a.id, a]))
    trpc.setQueryData(
      ['alarms.all', uid],
      ids.map((id) => alarmMap.get(id)!).filter(Boolean)
    )
    sortTimerRef.current&& clearTimeout(sortTimerRef.current)
    sortTimerRef.current = setTimeout(() => {
      sortAlarms.mutate(ids)
    }, 1000)
  }
  const deleteAlarm = trpc.useMutation('alarms.delete', {
    onSettled: () => {
      trpc.invalidateQuery(['alarms.all', uid])
      allAlarms.refetch()
    },
  })
  const editAlarm = trpc.useMutation('alarms.edit', {
    onSettled: () => {
      trpc.invalidateQuery(['alarms.all', uid])
      allAlarms.refetch()
    },
  })
  useEffect(() => {
    if (allAlarms.data) {
      alarmManager.current = new AlarmManager(allAlarms.data, (a: AlarmEditParam) => {
        editAlarm.mutate(a)
      })
      return () => {
        alarmManager.current?.destroy()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAlarms.data])
  if (!allAlarms.data?.length) {
    return null
  }
  return (
    <nav className="panel">
      <p className="panel-heading">
        <span style={{ flex: 1 }}>整点报时</span>
        <button
          className={cx(`button is-link is-small`, isLoading && `is-loading`)}
          style={{ marginRight: 10 }}
          title="使用永久链接"
          disabled={isLoading}
          onClick={async (e) => {
            setIsLoading(true)
            let u = new URL(location.href)
            const uid = nanoid()
            await Promise.all(allAlarms.data?.map(a => {
              const newAlarm = {
                ...a,
                uid
              } as AlarmCreateParam
              delete newAlarm['id']
              return trpc.client.mutation('alarms.add', newAlarm)
            }) || [])
            u.searchParams.set('id', uid)
            location.href = u.toString()
            setIsLoading(false)
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
      <ReactSortable list={allAlarms.data || []} setList={saveSortList} >
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

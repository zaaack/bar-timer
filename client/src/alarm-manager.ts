import type { Alarm } from '../../node_modules/.prisma/client'

import { AlarmEditParam, AlarmType, Duration } from "./utils"

export class AlarmManager {
  timers: Map<string, { current: any }> = new Map()
  constructor(public alarms: Alarm[], private save: (a: AlarmEditParam) => void) {
    this.updateTimers()
    ;(window as any)['alarmManager'] = this
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  }
  notify(alarm: Alarm) {
    const title = `${alarm.title} | 整点报时`
    if (alarm.notify) {
      new Notification(title, {
        body: new Date().toLocaleString(),
        vibrate: 1,
        requireInteraction: true,
      })
    }
    if (alarm.alert) {
      alert(title)
    }
    console.log('notify', new Date().toLocaleString(), alarm)
    // var audio = new Audio();
    // audio.src= "../sound/WindowsNotifyMessaging.wav"
    // audio.load()
    // audio.play()
  }
  clearTimers(alarm: Alarm) {
    let timer = this.timers.get(alarm.id) || { current: 0 }
    if (timer.current) {
      clearTimeout(timer.current)
      clearInterval(timer.current)
    }
    this.timers.delete(alarm.id)
  }
  destroy() {
    for (const alarm of this.alarms) {
        this.clearTimers(alarm)
    }
  }
  updateTimers() {
    for (const alarm of this.alarms) {
      if (alarm.disabled || alarm.done) {
        this.clearTimers(alarm)
        continue
      }
      let timer = this.timers.get(alarm.id)
      if (!timer) {
        timer = { current: 0 }
        console.log('updateTimers', alarm)
        const now = Date.now()
        if (alarm.type === AlarmType.once) {
          timer.current = setTimeout(() => {
            this.notify(alarm)
            this.save({
              ...alarm,
              done: true
            } as AlarmEditParam)
          }, alarm.timeout - (now + alarm.ahead * Duration.M1))
        } else if (alarm.type === AlarmType.repeat) {
          const recTimeout = () => {
            const timeout = alarm.duration - (Date.now() + alarm.ahead * Duration.M1) % alarm.duration
            timer!.current = setTimeout(() => {
              this.notify(alarm)
              recTimeout()
            }, timeout)

            console.log(`next repeat ${alarm.title}`, new Date(Date.now() + timeout).toLocaleString(), alarm)
          }
          recTimeout()
        }
        this.timers.set(alarm.id, timer)
      }
    }
  }
}

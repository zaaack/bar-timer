import { Alarm } from ".prisma/client"
import { AlarmEditParam, AlarmType, Duration } from "./utils"

export class AlarmManager {
    timers: Map<string, any[]> = new Map()
    constructor(public alarms: Alarm[], private save: (a: AlarmEditParam) => void) {
      this.updateTimers()
      ;(window as any)['alarmManager'] = this
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
      let timer = this.timers.get(alarm.id) || []
      for (const t of timer) {
        clearTimeout(t)
        clearInterval(t)
      }
      this.timers.delete(alarm.id)
    }
    updateTimers() {
      for (const alarm of this.alarms) {
        if (alarm.disabled || alarm.done) {
          this.clearTimers(alarm)
          continue
        }
        let timer = this.timers.get(alarm.id)
        if (!timer) {
          timer = []
          console.log('updateTimers', alarm)
          const now = Date.now()
          if (alarm.type === AlarmType.once) {
            let t1 = setTimeout(() => {
              this.notify(alarm)
              this.save({
                ...alarm,
                done: true
              } as AlarmEditParam)
            }, alarm.timeout - (now + alarm.ahead * Duration.M1))
            timer.push(t1)
          } else if (alarm.type === AlarmType.repeat) {
            const recTimeout = () => {
              const timeout = alarm.duration - (Date.now() + alarm.ahead * Duration.M1) % alarm.duration
              let t1 = setTimeout(() => {
                this.notify(alarm)
                recTimeout()
              }, timeout)
              timer![0] = t1 // 用数组作为引用

              console.log(`next repeat ${alarm.title}`, new Date(Date.now() + timeout).toLocaleString(), alarm)
            }
            recTimeout()
          }
          this.timers.set(alarm.id, timer)
        }
      }
    }
}

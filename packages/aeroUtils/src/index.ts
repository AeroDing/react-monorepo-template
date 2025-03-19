export const one = 1
export const two = 2
// 实现一个简单的Promise类
export class MyPromise<T> {
  state: 'pending' | 'fulfilled' | 'rejected'
  value: T | undefined
  reason: any
  onFulfilledCallbacks: (() => void)[]
  onRejectedCallbacks: (() => void)[]

  constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
    this.state = 'pending' // 初始状态为pending
    this.value = undefined // 成功的值
    this.reason = undefined // 失败的原因
    this.onFulfilledCallbacks = [] // 成功回调
    this.onRejectedCallbacks = [] // 失败回调

    const resolve = (value: T): void => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason: any): void => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    }
    catch (err) {
      reject(err)
    }
  }

  then(onFulfilled: (value: T) => void, onRejected?: (reason: any) => void): void {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value as T)
    }

    if (this.state === 'rejected') {
      onRejected?.(this.reason)
    }

    if (this.state === 'pending') {
      this.onFulfilledCallbacks.push(() => onFulfilled(this.value as T))
      this.onRejectedCallbacks.push(() => onRejected?.(this.reason))
    }
  }
}

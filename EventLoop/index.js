const TimerPromiseGen = (fn, timeout) => {
  let _timer;
  const p = new Promise((resolve, reject) => {
    _timer = setTimeout(() => {
      fn(resolve, reject);
    }, timeout);
  })
  return [p, _timer];
}

// 调用   轮询获取支付状态：成功|失败
function checkRepayStatus(serialNo, normal) {
  return dispatch => {
    return new Loop(
      ({ data }) => { return data && (data.status == 2 || data.status == 3) },
      () => request.post('url', { serialNo }),
      3000,
      3000,
      4 * 3000
    ).start();
  };
}

class Loop {
  constructor(condition, apiFc, interval = 3000, delay = 0, timeout = 0) {
    this.condition = condition;
    this.apiFc = apiFc;
    this.interval = interval; // 3000
    this.delay = delay; // 3000
    this.timeout = timeout; // 4*3000
  }
  start() {
    if (this.timeout) {
      // 如果还有时间，利用Promise.race将请求的函数和超时竞赛，假设超时时间为2s，2s后，请求还没有数据，就执行请求超时的函数
      return Promise.race([
        this._start(),  // 成功的回调
        TimerPromiseGen((resolve, reject) => {
          clearTimeout(this._timer);
          reject({ code: 201, msg: 'timeout' })
        }, this.timeout)[0] // 失败的回调
        // 这两个看哪个先执行，返回先执行的结果。。这两个之中，只有this._start()会去调接口。
      ])
    }
    // 竞赛时间为0，直接执行start函数
    return this._start();
  }
  _start() {
    // 如果还有时间，ns后执行loop
    if (this.delay) {
      return TimerPromiseGen(resolve => resolve(this._loop()), this.delay)[0];
    }
    // 没有时间就直接执行
    return this._loop();
  }
  async _loop() {
    const data = await this.apiFc();
    if (this.condition(data)) {
      return Promise.resolve(data);
    }
    let _loopP;
    [_loopP, this._timer] = TimerPromiseGen(resolve => resolve(this._loop()), this.interval)
  }
}
/*global moment*/
const calDiffStr = (oldDate, newDate = Date.now()) => {
  const oldMoment = moment(oldDate);
  const newMoment = moment(newDate);
  const duration = moment.duration(newMoment.diff(oldMoment));
  return Math.floor(duration.as('d')) + '天';
}


const BOY = '🐷';
const GIRL = '🐱';
const DATE_MAP = {
  MEET: new Date('2011-07-12'),
};


export default {
  code: 
`
// 今天是七夕节
// 也是我们在一起${calDiffStr(DATE_MAP.MEET)}的日子
// 在这个特殊的日子里
// 我想对你说：
// 因为有你
// 每一次出发我都满怀信心
// 因为有你
// 每一次回家看着你的守候，都是温馨的惊喜
// 有你的日子
// 即使再苦的生活也不觉的累
// 因为有你
// 即使再大艰险我也无所畏惧
// 有了你
// 我就拥有了全世界
// 让我觉的我所有的努力才有意义
// 愿你知晓
// 我对你的爱
// 一生不变
// 往后余生
// 我们的幸福才刚刚开始

// 上线发布
// 立此为证

....

// 开始发布啦...`,
  executions: [{
    name:'初始化',
    time: '',
    duration: 0,
    visible: false
  }, {
    name:'解压中',
    time: '',
    duration: 0,
    visible: false
  }, {
    name:'组装中',
    time: '',
    duration: 0,
    visible: false
  }, {
    name:'打包中',
    time: '',
    duration: 0,
    visible: false
  }, {
    name:'编译中...',
    time: '',
    visible: false
  }, {
    name:'上线啦...',
    time: '',
    visible: false
  }],
  barrages: [
    '66666666',
    '愿你美梦成真',
    '你的邀请函真是美',
    '人美心更美',
    '你是最棒的',
    '哇哇哇',
    '还差女朋友吗',
    '今晚翻你牌',
    '看朕给你打下的江山',
    '你写代码老快了',
    '你的代码真是棒',
    '😗 😙 😚 😋 ',
    '只要代码写得好，单身永远跑不了'
  ],
}
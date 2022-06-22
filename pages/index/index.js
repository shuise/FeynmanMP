// index.js
// 获取应用实例
const app = getApp()
const Services = require('../../utils/services.js')
const utils = require('../../utils/util.js')
const Article = Services.Article;

Page({
  data: {
    extra: {},
    title: 'title',
    tplName: 'creators',
    account: 'shuise',
    topic: '',
    achives: {
      list: [],
      total: 1,
      current: 1,
      size: 25,
      pages: 0
    }
  },
  // 事件处理函数
  website() {
    this.setData({
      url: 'https://notes.buetech.top'
    });
    // wx.navigateTo({
    //   url: ''
    // })
  },
  detail(event) {
    var article = event.currentTarget.dataset.article;
    console.log('detail',article);
    this.setData({
      url: article.originUrl
    });
  },
  onLoad: function (res) {
    var q = res.q || '';
    q = decodeURIComponent(q);
    // https://notes.bluetech.top/public/home.html?user=shuise
    var account = utils.getPara(q, 'user') || 'shuise';
    var topic = utils.getPara(q, 'topic') || '';

    this.setData({
      account: account,
      topic: topic
    });
    this.loadAchives(); 
  }, 
  loadAchives: function(){
    let _this = this;
    let pageSize = _this.data.achives.size;
    let current = _this.data.achives.current;

    Article.published(function(result){
      console.log('published', result);
      let achives = result.records || [];
      let list = [];
      if(current > 1){
        list = _this.data.achives.list.concat(achives);
      }else{
        list = achives;
      }
      let total = result.total/1;
      let pages = Math.ceil(result.total/1/pageSize);

      _this.setData({ 
        ['achives.total']: total,
        ['achives.pages']: pages,
        ['achives.list']: list
      });      
    },{ 
      account: _this.data.account,
      topic: _this.data.topic,
      current: current,
      size: pageSize
    });
  },
  dateFormat: function(time){
    console.log(time);
    return utils.dateFormat(time, 'M-d hh:mm');
  }
})

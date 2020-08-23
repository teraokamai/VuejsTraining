new Vue({
  el: '#app',
  data: {
    items: null,
    keyword: '',
    message: ''
  },
  watch: {
    keyword: function(newKeyword, oldKeyword) {
      //console.log(newKeyword)
      this.message = 'Wating for you to stop typing…'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // this.keyword = 'JavaScript'
    // this.getAnswer()
    
    // 指定時間内に同じイベントが発生すると処理は実行せず、発生しなければ処理を実行する
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  methods: {
    getAnswer: function () {
      if (this.kyeword === '') {
        this.items = null
        return
      }

      this.message = 'Loading...'
      var vm = this

      // 1ページ目を表示、20件、queryにはキーワードを渡す。
      var params = { page: 1, per_page: 20, query: this.keyword }
      axios.get('https://qiita.com/api/v2/items', { params })
        .then(function (responce) {
          console.log(responce)
          vm.items = responce.data
        })
        .catch(function (error) {
          vm.message = 'Error!' + error
        })
        .finally(function () {
          vm.message = ''
        })
    }

  }
})
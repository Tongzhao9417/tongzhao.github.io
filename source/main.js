var Main = {
  data() {
    return {
      allAlign: null,
      tableData: [],
    }
  },

  mounted() {
    // this.decomposed()
    this.update();
  },

  methods: {
    update() {
      var a;
      // var m;
      var c = ['name', 'likeNum', 'likeHostNum', 'likeSelfNum', 'commentContent', 'comment1','comment2','comment3','finishTime'];
      
      var self = this
      axios.post('https://119.29.91.253/show.php')
        .then(function (response) {
          if (response.status == 200) {
            a = response.data;
            $.each(a, function (index, item) {
              var d = [];
              for (var i = 0; i < item.length; i++) {
                
                d[c[i]] = item[i]
                // self.tableData.push(d)
                // console.log(d)
                // self.tableData = d;
              }
              self.tableData.push(d)
              // self.tableData = d
              // console.log(d)
            });
            // console.log(d)
            // self.tableData.push(d)
            
          }
        })
    },

    

  },



};

var app = new Vue(Main).$mount('#app');

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.component('events', {
    template: '#events-template',

    data () {
        return {
            list: [],
            timer: ''
        }
    },
    created () {
        this.fetchEventsList();
        this.timer = setInterval(this.fetchEventsList, 100);
    },
    methods: {
        fetchEventsList () {
            this.$http.get('events', (events) => {
                this.list = events;
            }).bind(this);
        },
        cancelAutoUpdate () {
            clearInterval(this.timer);
        }
    },
    beforeDestroy () {
      this.cancelAutoUpdate();
    }
});

new Vue({
  render: h => h(App),
}).$mount('#app')

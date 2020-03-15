Vue.component('app-main', {
    props: [
        'hours',
        'minutes',
        'seconds',
        'isTimerActive',
        'isBreakTime',
    ],
    template: '#app-main',
    methods: {
        toggleTimer() {
            this.$emit('toggle-timer');
        },
    },
});

Vue.component('app-controls', {
    props: [],
    template: '#app-controls',
    methods: {
        resetTimer() {
            this.$emit('reset-timer');
        },
        toggleSidebar() {
            this.$emit('toggle-sidebar');
        },
    },
});

const defaultHours = '00';
const defaultMinutes = '00';
const defaultSeconds = '03';

const app8 = new Vue({
    el: '#app-8',
    data: {
        // Settings
        initialHours: defaultHours,
        initialMinutes: defaultMinutes,
        initialSeconds: defaultSeconds,
        
        // figure this part out #TODO
        initShortBreak: '05',

        // App state
        timer: null, // used to keep track of interval of counting down
        hours: defaultHours,
        minutes: defaultMinutes,
        seconds: defaultSeconds,
        isTimerActive: false, // should show Play button
        isBreakTime: false,
    },
    methods: {
        toggleTimer: function() {
            const self = this;

            function ensurePadding(count) {
                return (count < 10 ? `0${count}` : count);
            }

            function countdownTime() {
                let hours = Number(self.$data.hours);
                let minutes = Number(self.$data.minutes);
                let seconds = Number(self.$data.seconds);

                if (seconds > 0) {
                    self.seconds--;
                    self.seconds = ensurePadding(self.seconds);
                    return;
                } 

                if (seconds == 0 && minutes > 0) {
                    self.minutes--;
                    self.seconds = 59;
                    self.minutes = ensurePadding(self.minutes);
                    return;
                }

                if (seconds == 0 && minutes == 0 && hours > 0) {
                    self.hours--;
                    self.minutes = 59;
                    self.seconds = 59;
                    self.hours = ensurePadding(self.hours);
                    return;
                }

                // test what happens if all reaches zero [x]-
                // >> just prints this
                console.log(`>>> the time is: ${hours}:${minutes}:${seconds}`);
                // if timer reaches 00:00:00 then stop all count down #TODO
                // don't start until press play again? or reset

                // test what happens if timer is set to negative value [x]-
                // << just prints that above 
            }

            // toggle Timer play and pause button
            self.isTimerActive = !self.isTimerActive;

            if (self.isTimerActive) {
                self.timer = setInterval(countdownTime, 1000);
            } else {
                clearInterval(self.timer);
            }

            // do something to check if it is break time (or next task) #TODO
        },
        resetTimer: function() {
            const self = this;

            clearInterval(self.timer);
            self.isTimerActive = false;
            self.hours = self.initialHours;
            self.minutes = self.initialMinutes;
            self.seconds = self.initialSeconds;

        },
        toggleSidebar: function() {
            const self = this;
            console.log('>>> toggleSidebar self: ', self);
        },
    },
});
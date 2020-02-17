 <template>
  <div id="page">
    <close @close="$emit('nav', 'root');" />
    <div class="words">
      <span v-for="word in failingWords" :key="word.word" :style="word.style">{{word.word}}</span>
    </div>
  </div>
</template>

<script>
// waves https://codepen.io/npr/pen/VmpLoR/

// import AnyControl from 'anycontrol';
import close from './close';

export default {
  name: 'sight-words',
  props: [],
  components: {
    close
  },
  data () {
    return {
      words: ['red', 'green', 'brown', 'blue', 'black', 'orange', 'pink', 'rainbow', 'purple', 'yellow'],
      trackFalling: [],
      time: Date.now(),
      startTime: Date.now()
    };
  },
  created () {
    var grammar = `#JSGF V1.0; grammar colors; public <color> = ${this.word.map(w => w.toLowerCase()).join(' | ')} ;`;
    // eslint-disable-next-line
    var recognition = new webkitSpeechRecognition();
    // eslint-disable-next-line
    var speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    recognition.start();
    console.log('Ready to receive a color command.');

    recognition.onresult = event => {
      // var color = event.results[0][0].transcript;
      var words = Array.from(event.results).map(e => {
        return [].concat(...Array.from(e).map(t => t.transcript.toLowerCase().split(' ')));
      });
      words = [].concat(...words).map(w => w.trim());

      this.trackFalling.forEach(wObj => {
        if (wObj.completed) return;
        if (words.includes(wObj.word.toLowerCase())) {
          wObj.completed = true;
          this.startTime = Date.now();
          console.log(wObj.word + ' complete!');
        }
      });
    };

    recognition.onend = function (event) {
      console.log(event, recognition);
    };

    // this.ctrl = new AnyControl();

    // this.words.forEach(w => {
    //   this.ctrl.addCommand(w, _ => {
    //     console.log('derp:' + w);
    //     var match = this.trackFalling.find(word => word.word === w);
    //     match.completed = true;
    //   });
    // });

    // // ctrl.DEBUG = true;
    // this.ctrl.start();

    this.af = window.requestAnimationFrame(this.gameLoop);

    this.startGame();
  },
  computed: {
    failingWords () {
      return this.trackFalling.filter(w => !w.completed);
    }
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.af);
    // this.ctrl.stop();
  },
  methods: {
    startGame () {
      this.startTime = Date.now();
      this.trackFalling = this.words.map((word, idx) => {
        return {
          word,
          idx,
          completed: false,
          style: {
            top: '0%'
          },
          started: Date.now()
        };
      });
    },
    gameLoop () {
      this.time = Date.now();
      var ttd = 4e3; // travel time to drop
      var timeProgress = this.time - this.startTime;
      var remaining = this.trackFalling.filter(i => !i.completed);
      if (!remaining.length) return;
      var idx = Math.floor((timeProgress / ttd) % remaining.length);
      var perProgress = (timeProgress % ttd) / ttd;
      remaining[idx].style.top = (perProgress * 110) + '%';

      // this.trackFalling.forEach(word => {
      //   var incOffset = timeProgress - (((word.idx * 2) * loopTime) / this.trackFalling.length);
      //   if (incOffset > loopTime) {
      //     var perProgress = (incOffset % loopTime) / loopTime;
      //     word.style.top = (perProgress * 100) + '%';
      //   } else {
      //     word.style.top = '0%';
      //   }
      // });

      this.af = window.requestAnimationFrame(this.gameLoop);
    }
  }
};
</script>

<style lang="stylus" scoped>

// https://www.materialui.co/flatuicolors

#page
  width 100vw
  height 100vh
  position relative

  .words
    width 100vw
    height 100vh
    position absolute
    top 0
    left 0

    span
      display inline-block
      position absolute
      top 0
      transform translateX(-50%);
      left 50%
      font-size 4rem

</style>

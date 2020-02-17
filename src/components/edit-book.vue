<template>
  <div id="page">
    <close @close="saveBook" />
    <div class="picture" :style="imageStyle">
      <input type="file" name="file" id="fileup" @change.prevent="selectImage" accept="image/*"/>
      <label for="fileup">
        <fai name="file-upload" scale="2" />
      </label>
      <v-touch
        tag="div"
        class="cover"
        @pan="pan"
        @panstart="pan"
        @pinch="pinch"
        @pinchstart="pinch"
      ></v-touch>
    </div>
    <div class="text">
      <div class="page-content">
        <div class="page-no">{{showingPage+1}}/{{pages.length}}</div>
        <contenteditable tag="div" class="words" :contenteditable="true" v-model="page.content" />
      </div>
    </div>
    <div class="buttons">
      <div>
        <button class="prev" v-if="showingPage > 0" @click="showingPage -= 1">
          <fai name="arrow-circle-left" scale="3" />
        </button>
      </div>
      <div>
        <!-- <button class="save" @click="saveBook">
          <fai name="save" scale="3" />
        </button> -->
      </div>
      <div>
        <button class="trash" v-if="showingPage !== 0" @click="delPage">
          <fai name="trash" scale="3" />
        </button>
        <button class="add" v-if="showingPage+1 === pages.length" @click="addPage">
          <fai name="plus-circle" scale="3" />
        </button>
        <button class="next" v-if="showingPage+1 < pages.length" @click="showingPage += 1">
          <fai name="arrow-circle-right" scale="3" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// for touch
// https://github.com/vuejs/vue-touch/tree/next
import close from './close';

export default {
  name: 'edit-book',
  props: ['id', 'books'],
  components: {
    close,
  },
  data: _ => {
    return {
      showingPage: 0,
      s: '',
      bookId: (Date.now() + Math.random()).toString(36),
      pages: [{
        content: 'Book Title',
        image: null,
        imageMeta: {
          scale: 1,
          x: 0,
          y: 0
        }
      }]
    };
  },
  created () {
    if (this.id) {
      this.bookId = this.id;
      var pages = this.books.find(b => this.id === b.id);
      console.log(pages);
      if (pages)
        this.pages = JSON.parse(JSON.stringify(pages.pages));
    }
  },
  computed: {
    page () {
      return this.pages[this.showingPage];
    },
    imageStyle () {
      return {
        backgroundImage: `url(${this.page.image})`,
        backgroundPosition: `calc(50% + ${this.page.imageMeta.x}px) calc(50% + ${this.page.imageMeta.y}px)`,
        backgroundSize: `${this.page.imageMeta.scale * 100}%`
      };
    }
  },
  methods: {
    saveBook () {
      if (this.pages.length > 1 || this.pages[0].content !== 'Book Title')
        this.$emit('saveBook', {
          id: this.bookId,
          pages: this.pages
        });
      this.$emit('nav', 'root');
    },
    addPage () {
      this.pages.push({
        content: 'Page Content',
        image: null,
        imageMeta: {
          scale: 1,
          x: 0,
          y: 0
        }
      });
      this.showingPage += 1;
    },
    delPage () {
      if (this.pages.length === 1) return;
      var result = confirm('Are you sure you want to delete this page?');
      if (!result) return;
      this.showingPage -= 1;
      this.pages.splice(this.showingPage, 1);
    },
    pan (e) {
      if (e.type === 'panstart')
        this.panInit = [this.page.imageMeta.x, this.page.imageMeta.y];
      this.page.imageMeta.x = this.panInit[0] + e.deltaX;
      this.page.imageMeta.y = this.panInit[1] + e.deltaY;
    },
    pinch (e) {
      if (e.type === 'pinchstart')
        this.pinchInit = [this.page.imageMeta.scale, e.scale];
      this.page.imageMeta.scale = this.pinchInit[0] + (e.scale - this.pinchInit[1]);
    },
    selectImage (e) {
      var files = e.target.files;
      if (files.length < 1) return;
      var file = files[0];
      console.log(file.type);
      if (!file.type.includes('image')) return;
      var reader = new FileReader();
      reader.onload = (fileObj) => {
        this.page.image = fileObj.srcElement.result;
        this.page.imageMeta = {
          scale: 1,
          x: 0,
          y: 0
        };
      };
      reader.readAsDataURL(file);
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

  .picture
    position absolute
    top 0
    width 100vw
    height 50vh
    background-color #34495e
    background-position 50% 50%
    background-size 100%
    background-repeat no-repeat
    position relative

    input
      opacity 0

    label
      position absolute
      bottom 1rem
      right 1rem
      z-index 1
      color #7f8c8d

    .cover
      position absolute
      top 0
      left 0
      right 0
      bottom 0

  .page-content
    position absolute
    bottom 0
    width 100vw
    height 50vh
    background-color white
    display flex
    justify-content center
    align-items center
    padding-bottom 5rem

    .page-no
      position absolute
      top 0
      right 0
      padding 0.5rem 1rem

    .words
      margin 2rem 4rem
      font-size 2rem
      min-width 5rem
      &:empty
        background-color #ecf0f1

  .buttons
    position absolute
    width 100%
    padding 0.5rem 1rem
    bottom 0
    display flex
    justify-content space-between
    align-items flex-end

    button
      margin-top 1rem
      min-width 4rem
      text-align center
      display block
      transition all 100ms ease-in-out
      &.trash
        color #e74c3c

      &:active
        transform scale(.98)
        color #2ecc71

</style>

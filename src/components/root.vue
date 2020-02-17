 <template>
  <div>
    <header>
      <h2>Learn to read</h2>
    </header>
    <div id="books">
      <h2>My Books</h2>
      <div class="content">
        <v-touch
          tag="div"
          v-for="book in books"
          :key="book.id"
          class="book"
          @tap="$emit('nav', `book:${book.id}`)"
          @pandown="pan(book.id, $event)"
          @panend="pan(book.id, $event)"
          @press="press"
          v-bind:pan-options="{ direction: 'down' }"
          :style="`background-image: url(${book.pages[0].image})`"
        >
          <div>{{book.pages[0].content}}</div>
        </v-touch>
        <div class="book" @click="$emit('nav', 'book')">
          <fai name="book-open" scale="3" />
          <div>New Book</div>
        </div>
      </div>
      <h2 @click="$emit('nav', 'sightWords')">Games</h2>

    </div>
  </div>
</template>

<script>

export default {
  name: 'root',
  props: ['books'],
  methods: {
    pan (id, e) {
      if (e.deltaY < 1 || e.type === 'panend') {
        e.target.style.top = '0px';
        if (e.deltaY > (e.target.clientHeight * 0.8))
          this.$emit('deleteBook', id);
        return;
      }
      e.target.style.top = e.deltaY + 'px';
    },
    press (e) {
      console.log(e);
    }
  }
};
</script>

<style lang="stylus" scoped>

// https://www.materialui.co/flatuicolors
header
  width 100%
  text-align center
  font-size 3rem

  h2
    margin 1rem 0

#books
  width 85vw
  margin 0 auto

  h2
    display inline-block
    margin 0.5rem 0

  .content
    width 100%
    overflow-x scroll
    overflow-y hidden
    white-space nowrap
    display flex

    .book
      margin-right 0.5rem
      display inline-block
      min-width 16rem
      height 12rem
      background-color #e67e22
      border-radius 6px
      position relative
      overflow hidden
      display inline-flex
      justify-content center
      align-items center
      background-size cover
      margin-bottom 1rem

      div
        position absolute
        bottom 0
        width 100%
        left 0
        background-color white
        text-align center
        text-overflow ellipsis
        padding 0.5rem
        overflow hidden

</style>

<template>
  <div id="app">
    <component
      :is="where.here"
      :id="where.id"
      @nav="nav"
      @saveBook="saveBook"
      @deleteBook="deleteBook"
      :books="books"
    />
  </div>
</template>

<script>
import root from './components/root.vue';
import book from './components/book.vue';
import sightWords from './components/sight-words.vue';
import lf from 'localforage';

export default {
  name: 'App',
  data: () => {
    return {
      whereStore: 'root',
      books: []
    };
  },
  async created () {
    this.books = (await lf.getItem('books')) || this.books;
  },
  computed: {
    where () {
      var [where, id] = this.whereStore.split(':');
      return {
        here: where,
        id: id
      };
    }
  },
  methods: {
    nav (where) {
      this.whereStore = where;
    },
    deleteBook (id) {
      var book = this.books.find(b => id === b.id);
      if (!book) return;
      var res = confirm(`Are you sure you want to delete the book "${book.pages[0].content}"?`);
      if (!res) return;
      var idx = this.books.findIndex(b => id === b.id);
      this.books.splice(idx, 1);
    },
    saveBook (book) {
      var idx = this.books.findIndex(b => book.id === b.id);
      if (idx > -1)
        this.books.splice(idx, 1, book);
      else
        this.books.push(book);

      lf.setItem('books', this.books);
    }
  },
  components: {
    root,
    book,
    sightWords
  }
};
</script>

<style lang="stylus">
// https://www.materialui.co/flatuicolors

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video
  margin 0
  padding 0
  border 0
  font-size 100%
  font inherit
  vertical-align baseline

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section
  display block

button
  border none
  background-color transparent
  outline none

body
  line-height 1

ol, ul
  list-style none

blockquote, q
  quotes none

blockquotebefore, blockquoteafter,
qbefore, qafter
  content ''
  content none

table
  border-collapse collapse
  border-spacing 0

html
body
  margin 0
  width 100vw
  height 100vh
  position relative
  overflow hidden

@import url('https://fonts.googleapis.com/css?family=Coming+Soon&display=swap');

body
  font-family: 'Coming Soon', cursive;
  background-color rgba(#9b59b6, 0.5)
  font-weight 600

*
  box-sizing border-box

</style>

import Vue from 'vue'
import Posts from '../../../src/theme/posts/Posts.vue'

describe('Posts.vue', () => {
  const createComponent = () => {
    const PostConstructor = Vue.extend(Posts)
    const comp = new PostConstructor({
      propsData: {
        link: 'http://www.kishore.org'
      }
    }).$mount()
    return comp
  }

  it('should render the link', () => {
    const component = createComponent()
    expect(component.$el.querySelector('.card-footer-item').getAttribute('href'))
      .to.equal('http://www.kishore.org')
  })
  it('should update elements href when property link changes', (done) => {
    const component = createComponent()
    expect(component.$el.querySelector('.card-footer-item').getAttribute('href'))
      .to.equal('http://www.kishore.org')

    component.link = 'www.google.com'

    Vue.nextTick(() => {
      expect(component.$el.querySelector('.card-footer-item').getAttribute('href'))
        .to.equal('www.google.com')
      done()
    })
  })
})
